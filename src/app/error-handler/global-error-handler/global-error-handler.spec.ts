import { GlobalErrorHandler } from './global-error-handler';

describe('GlobalErrorHandler', () => {

  let globalErrorHandler: GlobalErrorHandler;
  let mockErrorDialogService;
  let mockNgZone;
  let mockAuthService;

  beforeEach(() => {
    mockErrorDialogService = jasmine.createSpyObj('ErrorDialogService' , ['openDialog']);
    mockNgZone = jasmine.createSpyObj('NgZone', ['run', 'runOutsideAngular']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);

    globalErrorHandler = new GlobalErrorHandler(mockErrorDialogService, mockNgZone, mockAuthService);
  });

  it('should create an instance', () => {
    expect(globalErrorHandler).toBeTruthy();
  });
});
