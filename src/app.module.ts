import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { AuthModule } from "./auth/auth.module";
import { JiraModule } from "./jira/jira.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "nest-auth-test.sqlite",
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    JiraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
