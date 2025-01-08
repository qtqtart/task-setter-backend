import { Auth } from "@shared/decorators/auth.decorator";
import { GqlContext } from "@shared/types/graphql-context.types";

import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";

import { SessionModel } from "./models/session.model";
import { SessionService } from "./session.service";

@Resolver("Session")
export class SessionResolver {
  public constructor(private readonly _sessionService: SessionService) {}

  @Auth()
  @Query(() => SessionModel, {
    name: "findCurrentSession",
  })
  public async findCurrent(@Context() { req }: GqlContext) {
    return await this._sessionService.findCurrent(req);
  }

  @Auth()
  @Query(() => [SessionModel], {
    name: "findAllSessionExceptCurrent",
  })
  public async findAllExceptCurrent(@Context() { req }: GqlContext) {
    return await this._sessionService.findAllExceptCurrent(req);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteExceptCurrentSession",
  })
  public async deleteExceptCurrent(
    @Context() { req }: GqlContext,
    @Args("id") id: string,
  ) {
    return await this._sessionService.deleteExceptCurrent(req, id);
  }

  @Auth()
  @Mutation(() => Boolean, {
    name: "deleteAllSessionExceptCurrent",
  })
  public async deleteAllSessionExceptCurrent(@Context() { req }: GqlContext) {
    return await this._sessionService.deleteAllExceptCurrent(req);
  }
}
