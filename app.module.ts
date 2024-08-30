import { Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { JiraModule } from "src/jira/jira.module";

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
