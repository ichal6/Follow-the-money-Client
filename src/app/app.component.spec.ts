import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
    component.closePrompt();

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
});
