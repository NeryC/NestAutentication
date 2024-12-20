import { Customer, CustomerSchema } from './entities/customer.entity';
import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from './../products/products.module';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [CustomerController, UsersController, OrdersController, ProfileController],
  providers: [CustomersService, UsersService, OrdersService, ProfileService],
  exports: [UsersService],
})
export class UsersModule {}
