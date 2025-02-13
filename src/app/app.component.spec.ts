import {ComponentFixture, TestBed, fakeAsync, tick, flush} from '@angular/core/testing';
import { AppComponent, BeforeInstallPromptEvent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockInstallDiv: HTMLElement;
  let mockInstallButton: HTMLElement;

  const mockBeforeInstallPromptEvent: BeforeInstallPromptEvent = {
    platforms: ['web'],
    userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
    prompt: () => Promise.resolve(),
    preventDefault: () => {},
  } as BeforeInstallPromptEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    mockInstallDiv = document.createElement('div');
    mockInstallButton = document.createElement('button');

    spyOn(document, 'getElementById').and.callFake((id: string) => {
      if (id === 'install') return mockInstallDiv;
      if (id === 'install-button') return mockInstallButton;
      return null;
    });
    localStorage.clear();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize installDiv on ngOnInit', () => {
    // Arrange
    component.ngOnInit();

    // Act
    const result = component.installDiv;

    // Assert
    expect(result).toBe(mockInstallDiv);
  });

  it('should handle beforeinstallprompt event and set up install button', fakeAsync(() => {
    // Arrange
    const event = mockBeforeInstallPromptEvent;
    spyOn(event, 'preventDefault');

    // Act
    component.ngAfterViewInit();
    component['beforeInstallPromptSubject'].next(event);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.deferredPrompt).toBe(event);
    expect(document.getElementById).toHaveBeenCalledWith('install-button');
  }));

  it('should hide install div when closePrompt is called', () => {
    // Arrange
    component.ngOnInit();

    // Act
    component.closePrompt('dismissed');

    // Assert
    expect(component.installDiv?.style.display).toBe('none');
  });

  it('should handle install button click through event listener', fakeAsync(() => {
    // Arrange
    component.ngAfterViewInit();
    const event = mockBeforeInstallPromptEvent;
    spyOn(event, 'prompt').and.returnValue(Promise.resolve());
    spyOn(console, 'log');

    // Act
    window.dispatchEvent(Object.assign(new Event('beforeinstallprompt'), event));
    mockInstallButton.click();
    tick();

    // Assert
    expect(event.prompt).toHaveBeenCalled();
    tick();
    expect(console.log).toHaveBeenCalledWith('User accepted the install prompt');
    expect(component.deferredPrompt).toBeNull();
  }));

  it('should handle prompt error through event listener', fakeAsync(() => {
    // Arrange
    component.ngAfterViewInit();
    const errorEvent = {
      ...mockBeforeInstallPromptEvent,
      prompt: () => Promise.reject('Test Error')
    };
    spyOn(console, 'error');

    // Act
    window.dispatchEvent(Object.assign(new Event('beforeinstallprompt'), errorEvent));
    mockInstallButton.click();
    tick();

    // Assert
    expect(console.error).toHaveBeenCalledWith('Error during prompt:', 'Test Error');

    // Clean up
    flush(); // Ensure all pending asynchronous activities are completed
  }));

  it('should not trigger prompt when deferredPrompt is null', fakeAsync(() => {
    // Arrange
    component.ngAfterViewInit();
    spyOn(console, 'log');

    // Act
    mockInstallButton.click();
    tick();

    // Assert
    expect(console.log).not.toHaveBeenCalled();
  }));

  it('should set to none install Div after show install popup', fakeAsync(() => {
    // Arrange
    component.ngOnInit();
    component.deferredPrompt = {
      ...mockBeforeInstallPromptEvent,
      userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' })
    };
    spyOn(component, 'closePrompt');

    // Act
    component['handleUserInstallChoice']();
    tick();

    // Assert
    expect(component.closePrompt).toHaveBeenCalled();
    expect(component.deferredPrompt).toBeNull();
  }));

  it('should not initialize installDiv if app is running as PWA', () => {
    // Arrange
    spyOn(window, 'matchMedia').and.returnValue({ matches: true } as MediaQueryList);
    component.ngOnInit();

    // Act
    const result = component.installDiv;

    // Assert
    expect(result?.style.display).toBe('none');
  });

  it('should hide install div if user previously dismissed', () => {
    // Arrange
    localStorage.setItem('installPromptChoice', 'dismissed');

    // Act
    component.ngOnInit();

    // Assert
    expect(mockInstallDiv.style.display).toBe('none');
  });

  it('should not hide install div if user has not made a choice', () => {
    // Arrange
    const initialDisplay = mockInstallDiv.style.display;

    // Act
    component.ngOnInit();

    // Assert
    expect(mockInstallDiv.style.display).toBe(initialDisplay);
  });

  it('should set localStorage when closePrompt is called', () => {
    // Arrange
    const expectedValue = 'dismissed';

    // Act
    component.closePrompt('dismissed');

    // Assert
    expect(localStorage.getItem('installPromptChoice')).toBe(expectedValue);
    expect(mockInstallDiv.style.display).toBe('none');
  });

  it('should set localStorage when user accepts install prompt', fakeAsync(() => {
    // Arrange
    const expectedOutcome = 'accepted';
    component.deferredPrompt = {
      ...mockBeforeInstallPromptEvent,
      userChoice: Promise.resolve({ outcome: expectedOutcome, platform: 'web' })
    };

    // Act
    component['handleUserInstallChoice']();
    tick();

    // Assert
    expect(localStorage.getItem('installPromptChoice')).toBe(expectedOutcome);
    expect(mockInstallDiv.style.display).toBe('none');
  }));

  it('should set localStorage when user dismisses install prompt', fakeAsync(() => {
    // Arrange
    const expectedOutcome = 'dismissed';
    component.deferredPrompt = {
      ...mockBeforeInstallPromptEvent,
      userChoice: Promise.resolve({ outcome: expectedOutcome, platform: 'web' })
    };

    // Act
    component['handleUserInstallChoice']();
    tick();

    // Assert
    expect(localStorage.getItem('installPromptChoice')).toBe(expectedOutcome);
    expect(mockInstallDiv.style.display).toBe('none');
  }));

  it('should handle full install prompt workflow', fakeAsync(() => {
    // Arrange
    const expectedOutcome = 'accepted';
    component.deferredPrompt = {
      ...mockBeforeInstallPromptEvent,
      userChoice: Promise.resolve({ outcome: expectedOutcome, platform: 'web' })
    };
    spyOn(console, 'log');

    // Act
    component['handleUserInstallChoice']();
    tick();

    // Assert
    expect(localStorage.getItem('installPromptChoice')).toBe(expectedOutcome);
    expect(component.deferredPrompt).toBeNull();
    expect(mockInstallDiv.style.display).toBe('none');
    expect(console.log).toHaveBeenCalledWith(`User ${expectedOutcome} the install prompt`);
  }));

  it('should unsubscribe from beforeInstallPromptSubject on ngOnDestroy', () => {
    // Arrange
    spyOn(component['beforeInstallPromptSubject'], 'unsubscribe');

    // Act
    component.ngOnDestroy();

    // Assert
    expect(component['beforeInstallPromptSubject'].unsubscribe).toHaveBeenCalled();
  });

  it('should add the beforeinstallprompt event listener in ngAfterViewInit', () => {
    // Arrange
    spyOn(window, 'addEventListener').and.callThrough();

    // Act
    component.ngAfterViewInit();

    // Assert
    expect(window.addEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      jasmine.any(Function)
    );
  });

  it('should remove the beforeinstallprompt event listener in ngOnDestroy', () => {
    // Arrange
    spyOn(window, 'removeEventListener').and.callThrough();
    component.ngAfterViewInit();

    // Act
    component.ngOnDestroy();

    // Assert
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'beforeinstallprompt',
      jasmine.any(Function)
    );
  });

  it('should not trigger the event listener after component destruction', fakeAsync(() => {
    // Arrange
    component.ngAfterViewInit();
    component.ngOnDestroy();

    // Act & Assert
    expect(() => {
      window.dispatchEvent(new Event('beforeinstallprompt'));
      tick();
    }).not.toThrow();
  }));
});
