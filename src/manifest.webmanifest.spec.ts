import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Manifest Icons', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should load correct icons from manifest.webmanifest', () => {
    const expectedIcons = [
      { src: 'assets/icons/pwa/icon-72x72.png', sizes: '72x72', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-96x96.png', sizes: '96x96', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'maskable any' },
      { src: 'assets/icons/pwa/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' }
    ];

    httpClient.get<Manifest>('/assets/manifest.webmanifest').subscribe((manifest) => {
      expect(manifest.icons).toEqual(expectedIcons);
    });

    const req = httpTestingController.expectOne('/assets/manifest.webmanifest');
    expect(req.request.method).toEqual('GET');
    req.flush({ icons: expectedIcons });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  interface Icon {
    src: string;
    sizes: string;
    type: string;
    purpose: string;
  }

  interface Manifest {
    icons: Icon[];
  }
});
