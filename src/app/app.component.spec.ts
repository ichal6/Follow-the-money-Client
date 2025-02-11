import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent, BeforeInstallPromptEvent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockInstallDiv: HTMLElement;
  let mockInstallButton: HTMLElement;

  // Mock BeforeInstallPromptEvent
  const mockBeforeInstallPromptEvent: BeforeInstallPromptEvent = {
    platforms: ['web'],
    userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
    prompt: () => Promise.resolve(),
    preventDefault: () => {},
  } as BeforeInstallPromptEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    // Create mock elements
    mockInstallDiv = document.createElement('div');
    mockInstallButton = document.createElement('button');

    // Setup spies for document.getElementById
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
    component.ngOnInit();
    expect(component.installDiv).toBe(mockInstallDiv);
  });

  it('should handle beforeinstallprompt event and set up install button', fakeAsync(() => {
    const event = mockBeforeInstallPromptEvent;
    spyOn(event, 'preventDefault');

    // Trigger ngAfterViewInit
    component.ngAfterViewInit();

    // Directly emit the mock event
    component['beforeInstallPromptSubject'].next(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.deferredPrompt).toBe(event);
    expect(document.getElementById).toHaveBeenCalledWith('install-button');
  }));

  it('should hide install div when closePrompt is called', () => {
    component.ngOnInit();
    component.closePrompt();
    expect(component.installDiv?.style.display).toBe('none');
  });

  it('should handle install button click through event listener', fakeAsync(() => {
    // Setup
    component.ngAfterViewInit();
    const event = mockBeforeInstallPromptEvent;
    spyOn(event, 'prompt').and.returnValue(Promise.resolve());
    spyOn(console, 'log');

    // Simulate beforeinstallprompt event
    window.dispatchEvent(Object.assign(new Event('beforeinstallprompt'), event));

    // Trigger the click event
    mockInstallButton.click();
    tick();

    expect(event.prompt).toHaveBeenCalled();

    // Wait for userChoice promise to resolve
    tick();
    expect(console.log).toHaveBeenCalledWith('User accepted the install prompt');
    expect(component.deferredPrompt).toBeNull();
  }));

  it('should handle prompt error through event listener', fakeAsync(() => {
    // Setup
    component.ngAfterViewInit();
    const errorEvent = {
      ...mockBeforeInstallPromptEvent,
      prompt: () => Promise.reject('Test Error')
    };
    spyOn(console, 'error');

    // Simulate beforeinstallprompt event
    window.dispatchEvent(Object.assign(new Event('beforeinstallprompt'), errorEvent));

    // Trigger the click event
    mockInstallButton.click();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error during prompt:', 'Test Error');
  }));

  it('should not trigger prompt when deferredPrompt is null', fakeAsync(() => {
    // Setup
    component.ngAfterViewInit();
    spyOn(console, 'log');

    // Trigger the click event without setting up deferredPrompt
    mockInstallButton.click();
    tick();

    expect(console.log).not.toHaveBeenCalled();
  }));
});
