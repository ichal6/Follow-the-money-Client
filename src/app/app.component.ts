import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  deferredPrompt: BeforeInstallPromptEvent | null = null;
  installButton :HTMLElement | null = null;
  installDiv :HTMLElement | null = null;
  private beforeInstallPromptSubject = new Subject<BeforeInstallPromptEvent>();

  ngOnInit() {
    this.installDiv = document.getElementById('install');
    if (window.matchMedia('(display-mode: standalone)').matches && this.installDiv) {
      this.installDiv.style.display = 'none';
    }

    const userChoice = localStorage.getItem('installPromptChoice');
    if (userChoice && this.installDiv && userChoice === 'dismissed') {
      this.installDiv.style.display = 'none';
    }
  }

  ngAfterViewInit() {
    window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
      this.beforeInstallPromptSubject.next(event);
    });

    this.beforeInstallPromptSubject.subscribe((event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallPromotion();
    });
  }

  ngOnDestroy() {
    this.beforeInstallPromptSubject?.unsubscribe();
  }

  closePrompt(status: 'accepted' | 'dismissed') {
    if(this.installDiv)
      this.installDiv.style.display = 'none';
    localStorage.setItem('installPromptChoice', status);
  }

  private showInstallPromotion() {
    this.installButton = document.getElementById('install-button');
    if (!this.installButton)
      return;

    this.addInstallButtonClickListener();
  }

  private addInstallButtonClickListener() {
    this.installButton.addEventListener('click', () => {
      if (!this.deferredPrompt)
        return;
      this.promptInstallOption();
      this.handleUserInstallChoice();
    });
  }

  private handleUserInstallChoice() {
    this.deferredPrompt.userChoice.then((choiceResult) => {
      console.log(`User ${choiceResult.outcome} the install prompt`);
      localStorage.setItem('installPromptChoice', choiceResult.outcome);
      this.closePrompt(choiceResult.outcome);
      this.deferredPrompt = null;
    });
  }

  private promptInstallOption() {
    this.deferredPrompt.prompt()
      .then(() => { })
      .catch((error) => {
        console.error('Error during prompt:', error);
      });
  }
}
