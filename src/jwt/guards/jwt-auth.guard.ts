import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtTokenService } from "../jwt.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtTokenService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException({ message: "Некорректный токен" });
      }

      const user = this.jwtService.verifyToken(token, process.env.PRIVATE_KEY)
      req.userId = user;
      return true
    } catch (e) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}
