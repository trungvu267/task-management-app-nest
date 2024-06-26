import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { RolesGuard } from './auth/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MailModule } from './mail/mail.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { WorkspacePermissionModule } from './workspace-permission/workspace-permission.module';
import { S3UploadModule } from './s3-upload/s3-upload.module';
import { ReportModule } from './report/report.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SubTaskModule } from './sub-task/sub-task.module';
import { MessageModule } from './message/message.module';
import { MessageGateway } from './message/message.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    MongooseModule,
    MailModule,
    UsersModule,
    TaskModule,
    AuthModule,
    WorkspacesModule,
    BoardModule,
    WorkspacePermissionModule,
    S3UploadModule,
    ReportModule,
    SubTaskModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // MailService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
