import {AfterViewInit, Component, OnInit} from '@angular/core';

interface BeforeInstallPromptEvent extends Event {
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
export class AppComponent implements OnInit, AfterViewInit {
  deferredPrompt: BeforeInstallPromptEvent | null = null;
  installButton :HTMLElement | null = null;
  installDiv :HTMLElement | null = null;

  ngOnInit() {
    this.installDiv = document.getElementById('install');
  }

  ngAfterViewInit() {
    window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showInstallPromotion();
    });
  }

  closePrompt() {
    if(this.installDiv)
      this.installDiv.style.display = 'none';
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
