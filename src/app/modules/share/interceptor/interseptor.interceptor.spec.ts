import {TestBed} from '@angular/core/testing';

import {InterseptorInterceptor} from './interseptor.interceptor';

describe('InterseptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterseptorInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: InterseptorInterceptor = TestBed.inject(InterseptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
