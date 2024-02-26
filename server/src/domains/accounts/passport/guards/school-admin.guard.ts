import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SchoolAdminGuard extends AuthGuard('school-admin') {}
