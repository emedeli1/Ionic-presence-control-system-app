import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow loading if user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someUserId');
    const result = guard.canLoad({ path: '' }, []);
    expect(result).toBeTrue();
  });

  it('should block loading and navigate to login if user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = guard.canLoad({ path: '' }, []);
    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});

