import { Authorization } from "@shared/decorators/authorization.decorator";
import { GraphQLContext } from "@shared/types/graphql-context.types";

import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";

import { SessionModel } from "./models/session.model";
import { SessionService } from "./session.service";

@Resolver("Session")
export class SessionResolver {
  public constructor(private readonly _sessionService: SessionService) {}

  @Authorization()
  @Query(() => SessionModel, {
    name: "findCurrentSession",
  })
  public async findCurrent(@Context() { req }: GraphQLContext) {
    return await this._sessionService.findCurrent(req);
  }

  @Authorization()
  @Query(() => [SessionModel], {
    name: "findAllSessionExceptCurrent",
  })
  public async findAllExceptCurrent(@Context() { req }: GraphQLContext) {
    return await this._sessionService.findAllExceptCurrent(req);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: "deleteSessionExceptCurrent",
  })
  public async deleteExceptCurrent(
    @Context() { req }: GraphQLContext,
    @Args("id") id: string,
  ) {
    return await this._sessionService.deleteExceptCurrent(req, id);
  }

  @Authorization()
  @Mutation(() => Boolean, {
    name: "deleteAllSessionExceptCurrent",
  })
  public async deleteAllSessionExceptCurrent(
    @Context() { req }: GraphQLContext,
  ) {
    return await this._sessionService.deleteAllExceptCurrent(req);
  }
}
