import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
  Get,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/user/user.dto";
import { AuthenticatedGuard, LocalAuthGuard, LoginGuard } from "./auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post("/login")
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password
    );

    if (userInfo) {
      res.cookie("login", JSON.stringify(userInfo), {
        httponly: false,
        maxAge: 100 * 60 * 60 * 24 * 7,
      });
    } else {
      return res.send({ message: "login failed" });
    }

    return res.send({ message: "login success" });
  }

  ///////Login Only Cookie/////////////
  @UseGuards(LoginGuard)
  @Post("/login2")
  async login2(@Request() req, @Response() res) {
    if (!req.cookies["login"] && req.user) {
      res.cookie("login", JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
    }
    return res.send({ message: "login2 sucess" });
  }

  @UseGuards(LoginGuard)
  @Get("test-guard")
  testGuard() {
    return "skip api test";
  }
  ///////Login Only Cookie/////////////

  ///////Login with Session/////////////
  @UseGuards(LocalAuthGuard)
  @Post("/login3")
  login3(@Request() req) {
    console.log("login3");
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get("/test-guard3")
  testGuardWithSession(@Request() req) {
    return req.user;
  }

  @Get("/logout")
  logout(@Request() req, @Response() res) {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed", error: err });
        }
        res.clearCookie("connect.sid", { path: "/" });
        return res.status(200).json({ message: "Logout successful" });
      });
    } else {
      return res.status(401).json({ message: "No active session" });
    }
  }
  ///////Login with Session/////////////
}
