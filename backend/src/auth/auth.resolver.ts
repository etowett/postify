import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from '../users/dto/login-response.type';
import { LoginUserInput } from '../users/dto/login-user.input';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user._id as string, user.email);
  }
}
