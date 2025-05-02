import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  req.headers.append('Authorization', 'PVEAPIToken=root@pam!TEST-Token=7ba78f29-7baa-4a67-813c-583ef744a070');
  return next(req);
};
