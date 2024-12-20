import { Observable } from 'rxjs';
import { PayloadToken } from 'src/auth/models/token.model';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/auth/models/roles.model';
import { ROLES_KEY } from 'src/auth/decorators/role/role.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('No tienes los permisos necesarios');
    }
    return isAuth;
  }
}
