/**
 * @file res/data/products.tsx
 * Products information for the Store Demo.
 *
 * Created by T2 on 08/22/2017
 *
 * T2 PWA Starter
 *
 * Copyright © 2009-2017 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright © 2009-2017 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * User Registration Requested. Please send email
 * with your contact information to: robert.a.kayl.civ@mail.mil
 * Government Agency Point of Contact for
 * Original Software: robert.a.kayl.civ@mail.mil
 */
import {schema, normalize} from 'normalizr';

const productsSchema = new schema.Entity('products');
const productArraySchema = new schema.Array(productsSchema);

export interface ProductInterface{
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}


export const makeProduct = (id:number,title:string,price:number,imageName: string,description:string = ''):ProductInterface => {
  return {
    id,
    title,
    price,
    image: require('../images/StoreDemo/products/square/' + imageName),
    description
  }
};

const oscDesc = `The ultimate debugging tool for electronics, this oscilloscope will turn you into a "Circuit Whisperer". You will be able to peer into the workings of your circuits to better understand them. Difficult problems will suddenly become trivial. We tried many beginner oscilloscopes and found this one to be a perfect balance of price and function for anyone looking to to examine signals lower than 50MHz and in need of 4 channels.  At this price, it's perfect as a 'first scope' or as a hacker-space resource to share - and can be used for years as your projects get more complicated.`;
const productsData = [
  makeProduct(1,'Toy Car',9.99,'toy_car.jpg','Vroom Vroom'),
  makeProduct(2,'Doll',19.99, 'doll.jpg', "Goo Goo Ga Ga"),
  makeProduct(3,'RC Helicopter',59.99,'rc_heli.jpg',"Yay helicopter"),
  makeProduct(4,'Coffee Grinder',26.99, 'coffee-grinder.jpg',"For to make coffee"),
  makeProduct(5,'Rigol Oscilloscope',355.99,'rigol_osc.jpg',oscDesc),
  makeProduct(6,'Beach Towel',19.99, 'beach_towel.jpg', "Don't forget to bring a towel"),
  makeProduct(7,'Ear Plugs',6.99,'plugs.jpg',"So you don't have to listen"),
  makeProduct(8,'Desk Lamp',15.99, 'desk_lamp.jpg',"Shine a light on this"),
  makeProduct(9,'Dune Buggy',12000, 'dune_buggy.jpg', ""),
  makeProduct(10,'Gift Card',20.00,'gift_card.jpg',"Yep"),
  makeProduct(11,'Hawaii Chair',6699.00,'hawaii.jpg',"Aloha"),
  makeProduct(12,'The Snuggie', 14.99,'snuggie.jpg',"The Blanket That Has Sleeves, Now With Pockets!!!!!!!!!!"),
  makeProduct(13,'Unicorn Meat', 5.99,'unicorn-meat.jpg',"Tastes like chicken."),
  makeProduct(14,'Pet Rock', 55.99,'pet-rock.jpg',"Stay!"),
  makeProduct(15,'Pet Sweep', 55.99,'pet-sweep.jpg',"Good Dog!"),
  makeProduct(16,'Crib Dribbler', 45.99,'crib-dribbler.jpg',"")
];

export const normalizedProducts = normalize(productsData, productArraySchema);
export const defaultProducts = normalizedProducts.entities.products;
export const defaultProductIds = normalizedProducts.result;
