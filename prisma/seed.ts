import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv';
config()
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const prisma = new PrismaClient()

const productsData = [
  {
    "_id": {
      "$oid": "61fabb3154d0d0a51edccee6"
    },
    "name": "Ray-Ban Aviator Classic Gold",
    "image": "https://example.com/images/rayban-aviator-gold.jpg",
    "brand": "Ray-Ban",
    "category": "Eyeglasses",
    "description": "Iconic aviator design, gold metal frame, G-15 green lenses, UV protection, lightweight and durable",
    "rating": 0,
    "numReviews": 0,
    "price": 169.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T17:11:13.763Z"
    },
    "updated_at": {
      "$date": "2023-07-02T17:11:13.763Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9d3c54d0d0a51edccdea"
    },
    "name": "Oakley Holbrook Matte Black",
    "image": "https://example.com/images/oakley-holbrook-black.jpg",
    "brand": "Oakley",
    "category": "Sunglasses",
    "description": "Matte black frame, Prizm polarized lenses, impact-resistant Plutonite material, sporty design",
    "rating": 5,
    "numReviews": 1,
    "price": 149.99,
    "countInStock": 99,
    "reviews": [
      {
        "user_id": "65defc93ce29856a1d3d3687",
        "username": "Hai Thanh",
        "rating": 5,
        "comment": "Good",
        "_id": {
          "$oid": "65ee825193ade00fdd192c6f"
        },
        "created_at": {
          "$date": "2024-03-11T04:02:25.663Z"
        },
        "updated_at": {
          "$date": "2024-03-11T04:02:25.663Z"
        }
      }
    ],
    "created_at": {
      "$date": "2023-07-02T15:03:24.114Z"
    },
    "updated_at": {
      "$date": "2024-03-13T10:24:11.162Z"
    },
    "__v": 1
  },
  {
    "_id": {
      "$oid": "61fa962254d0d0a51edccd0c"
    },
    "name": "Gucci GG Round Frame Black",
    "image": "https://example.com/images/gucci-round-black.jpg",
    "brand": "Gucci",
    "category": "Eyeglasses",
    "description": "Round acetate frame, black finish, lightweight, prescription-ready, iconic Gucci logo",
    "rating": 0,
    "numReviews": 0,
    "price": 299.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:33:06.256Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:33:06.256Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa90db54d0d0a51edccc40"
    },
    "name": "Prada Cat-Eye Tortoise",
    "image": "https://example.com/images/prada-cateye-tortoise.jpg",
    "brand": "Prada",
    "category": "Sunglasses",
    "description": "Cat-eye tortoise frame, polarized lenses, UV400 protection, stylish and elegant design",
    "rating": 0,
    "numReviews": 0,
    "price": 249.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:10:35.056Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:10:35.056Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa901954d0d0a51edccc2b"
    },
    "name": "Persol PO Square Frame Brown",
    "image": "https://example.com/images/persol-square-brown.jpg",
    "brand": "Persol",
    "category": "Eyeglasses",
    "description": "Square brown acetate frame, crystal lenses, Meflecto system for comfort, handcrafted in Italy",
    "rating": 0,
    "numReviews": 0,
    "price": 199.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:07:21.739Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:07:21.739Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61f65428e1273b6867abb86c"
    },
    "name": "Tom Ford FT Aviator Silver",
    "image": "https://example.com/images/tomford-aviator-silver.jpg",
    "brand": "Tom Ford",
    "category": "Sunglasses",
    "description": "Silver metal aviator frame, gradient lenses, adjustable nose pads, premium leather accents",
    "rating": 4.666666666666667,
    "numReviews": 3,
    "price": 399.99,
    "countInStock": 100,
    "reviews": [
      {
        "_id": {
          "$oid": "61f9294b52258858000c650c"
        },
        "name": "Adithya",
        "rating": 5,
        "comment": "Light weight and stylish.",
        "created_at": {
          "$date": "2023-07-01T12:36:27.249Z"
        },
        "updated_at": {
          "$date": "2023-07-01T12:36:27.249Z"
        }
      },
      {
        "_id": {
          "$oid": "61f929b352258858000c6539"
        },
        "name": "Steve",
        "rating": 5,
        "comment": "Great sunglasses",
        "created_at": {
          "$date": "2023-07-01T12:38:11.234Z"
        },
        "updated_at": {
          "$date": "2023-07-01T12:38:11.234Z"
        }
      },
      {
        "_id": {
          "$oid": "61f92a1b75e5339fc3836059"
        },
        "name": "Jay",
        "rating": 4,
        "comment": "Good but not perfect fit",
        "created_at": {
          "$date": "2023-07-01T12:39:55.347Z"
        },
        "updated_at": {
          "$date": "2023-07-01T12:39:55.347Z"
        }
      }
    ],
    "created_at": {
      "$date": "2023-07-30T09:02:32.052Z"
    },
    "updated_at": {
      "$date": "2023-07-01T12:39:55.347Z"
    },
    "__v": 3
  },
  {
    "_id": {
      "$oid": "61fa95cd54d0d0a51edcccf7"
    },
    "name": "Warby Parker Harris Blue",
    "image": "https://example.com/images/warby-harris-blue.jpg",
    "brand": "Warby Parker",
    "category": "Eyeglasses",
    "description": "Blue acetate frame, anti-reflective coating, lightweight, prescription-ready",
    "rating": 0,
    "numReviews": 0,
    "price": 95.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:31:41.512Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:31:41.512Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa938354d0d0a51edcccac"
    },
    "name": "Maui Jim Peahi Polarized Black",
    "image": "https://example.com/images/mauijim-peahi-black.jpg",
    "brand": "Maui Jim",
    "category": "Sunglasses",
    "description": "Black frame, PolarizedPlus2 lenses, UV protection, ideal for outdoor activities",
    "rating": 0,
    "numReviews": 0,
    "price": 229.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:21:55.830Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:21:55.830Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa92b654d0d0a51edccc8b"
    },
    "name": "Versace Medusa Gold",
    "image": "https://example.com/images/versace-medusa-gold.jpg",
    "brand": "Versace",
    "category": "Sunglasses",
    "description": "Gold-tone frame, Medusa logo detailing, polarized lenses, luxurious design",
    "rating": 0,
    "numReviews": 0,
    "price": 279.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:18:30.151Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:18:30.151Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa944654d0d0a51edcccd6"
    },
    "name": "Ray-Ban Wayfarer Classic Black",
    "image": "https://example.com/images/rayban-wayfarer-black.jpg",
    "brand": "Ray-Ban",
    "category": "Sunglasses",
    "description": "Classic black frame, G-15 lenses, UV protection, timeless design",
    "rating": 0,
    "numReviews": 0,
    "price": 159.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:25:10.404Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:25:10.404Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa96ac54d0d0a51edccd1e"
    },
    "name": "Oakley Frogskins Clear",
    "image": "https://example.com/images/oakley-frogskins-clear.jpg",
    "brand": "Oakley",
    "category": "Sunglasses",
    "description": "Clear frame, Prizm lenses, lightweight O Matter material, sporty casual style",
    "rating": 0,
    "numReviews": 0,
    "price": 139.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:35:24.216Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:35:24.216Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9bec54d0d0a51edccda2"
    },
    "name": "Burberry BE Square Frame Beige",
    "image": "https://example.com/images/burberry-square-beige.jpg",
    "brand": "Burberry",
    "category": "Eyeglasses",
    "description": "Beige acetate frame, anti-scratch lenses, check pattern accents, elegant design",
    "rating": 0,
    "numReviews": 0,
    "price": 249.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:57:48.264Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:57:48.264Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa979154d0d0a51edccd48"
    },
    "name": "Chanel Oval Pearl White",
    "image": "https://example.com/images/chanel-oval-white.jpg",
    "brand": "Chanel",
    "category": "Sunglasses",
    "description": "Pearl white frame, gradient lenses, signature interlocking C logo, luxurious finish",
    "rating": 0,
    "numReviews": 0,
    "price": 349.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:39:13.120Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:39:13.120Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa99b954d0d0a51edccd7e"
    },
    "name": "Warby Parker Durand Tortoise",
    "image": "https://example.com/images/warby-durand-tortoise.jpg",
    "brand": "Warby Parker",
    "category": "Eyeglasses",
    "description": "Tortoise acetate frame, anti-reflective coating, durable and stylish",
    "rating": 0,
    "numReviews": 0,
    "price": 95.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:48:25.269Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:48:25.269Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9b5554d0d0a51edccd96"
    },
    "name": "Maui Jim Haleakala Red",
    "image": "https://example.com/images/mauijim-haleakala-red.jpg",
    "brand": "Maui Jim",
    "category": "Sunglasses",
    "description": "Red frame, PolarizedPlus2 lenses, UV protection, lightweight and vibrant",
    "rating": 0,
    "numReviews": 0,
    "price": 199.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:55:17.149Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:55:17.149Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9ca554d0d0a51edccdc0"
    },
    "name": "Ray-Ban Clubmaster Aluminum",
    "image": "https://example.com/images/rayban-clubmaster-aluminum.jpg",
    "brand": "Ray-Ban",
    "category": "Sunglasses",
    "description": "Aluminum frame, polarized lenses, retro-inspired design, UV protection",
    "rating": 0,
    "numReviews": 0,
    "price": 189.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T15:00:53.944Z"
    },
    "updated_at": {
      "$date": "2023-07-02T15:00:53.944Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa96e354d0d0a51edccd33"
    },
    "name": "Prada Rectangle Black",
    "image": "https://example.com/images/prada-rectangle-black.jpg",
    "brand": "Prada",
    "category": "Eyeglasses",
    "description": "Black rectangular frame, lightweight acetate, anti-reflective lenses",
    "rating": 0,
    "numReviews": 0,
    "price": 229.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:36:19.566Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:36:19.566Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9cf654d0d0a51edccdd5"
    },
    "name": "Oakley Radar EV Path White",
    "image": "https://example.com/images/oakley-radar-white.jpg",
    "brand": "Oakley",
    "category": "Sunglasses",
    "description": "White frame, Prizm Road lenses, Unobtainium nosepads, sport performance design",
    "rating": 0,
    "numReviews": 0,
    "price": 179.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T15:02:14.029Z"
    },
    "updated_at": {
      "$date": "2023-07-02T15:02:14.029Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9b1554d0d0a51edccd8a"
    },
    "name": "Tom Ford Rectangular Horn",
    "image": "https://example.com/images/tomford-rectangular-horn.jpg",
    "brand": "Tom Ford",
    "category": "Eyeglasses",
    "description": "Horn-colored frame, premium acetate, T-logo detailing, sophisticated style",
    "rating": 0,
    "numReviews": 0,
    "price": 349.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:54:13.130Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:54:13.130Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa98d254d0d0a51edccd69"
    },
    "name": "Versace VE Cat-Eye Pink",
    "image": "https://example.com/images/versace-cateye-pink.jpg",
    "brand": "Versace",
    "category": "Sunglasses",
    "description": "Pink cat-eye frame, gradient lenses, Medusa emblem, bold fashion statement",
    "rating": 0,
    "numReviews": 0,
    "price": 269.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T14:44:34.727Z"
    },
    "updated_at": {
      "$date": "2023-07-02T14:44:34.727Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fabb7054d0d0a51edccefb"
    },
    "name": "Ray-Ban Round Metal Red",
    "image": "https://example.com/images/rayban-round-red.jpg",
    "brand": "Ray-Ban",
    "category": "Sunglasses",
    "description": "Red metal frame, round lenses, UV protection, vintage-inspired look",
    "rating": 0,
    "numReviews": 0,
    "price": 169.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T17:12:16.809Z"
    },
    "updated_at": {
      "$date": "2023-07-02T17:12:16.809Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61faba4a54d0d0a51edccebc"
    },
    "name": "Gucci GG Aviator Black",
    "image": "https://example.com/images/gucci-aviator-black.jpg",
    "brand": "Gucci",
    "category": "Sunglasses",
    "description": "Black aviator frame, green-red stripe detail, polarized lenses, luxury design",
    "rating": 0,
    "numReviews": 0,
    "price": 329.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T17:07:22.836Z"
    },
    "updated_at": {
      "$date": "2023-07-02T17:07:22.836Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9e1554d0d0a51edcce08"
    },
    "name": "Persol PO Oval Tortoise",
    "image": "https://example.com/images/persol-oval-tortoise.jpg",
    "brand": "Persol",
    "category": "Eyeglasses",
    "description": "Tortoise oval frame, crystal lenses, Meflecto system, handcrafted quality",
    "rating": 0,
    "numReviews": 0,
    "price": 219.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T15:07:01.916Z"
    },
    "updated_at": {
      "$date": "2023-07-02T15:07:01.916Z"
    },
    "__v": 0
  },
  {
    "_id": {
      "$oid": "61fa9fa554d0d0a51edcce1d"
    },
    "name": "Chanel Quilted Round Black",
    "image": "https://example.com/images/chanel-quilted-black.jpg",
    "brand": "Chanel",
    "category": "Sunglasses",
    "description": "Black round frame, quilted detailing, polarized lenses, iconic Chanel style",
    "rating": 0,
    "numReviews": 0,
    "price": 399.99,
    "countInStock": 100,
    "reviews": [],
    "created_at": {
      "$date": "2023-07-02T15:13:41.075Z"
    },
    "updated_at": {
      "$date": "2023-07-02T15:13:41.075Z"
    },
    "__v": 0
  }
]

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  // Xóa dữ liệu cũ theo thứ tự phụ thuộc
   //await prisma.cart.deleteMany(); // Xóa Cart trước vì nó tham chiếu User
   //await prisma.user.deleteMany();
   //await prisma.product.deleteMany();

  // Seed user
  await prisma.user.create({
    data: {
      username: 'Hai Duong',
      email: 'nguyenhaithanh@gmail.com',
      verified: true,
      password: '0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a',
      verification_code: faker.string.alphanumeric(6),
      avatar_url: faker.image.avatarLegacy(),
      role: 0,
      phone: faker.phone.number(),
      two_factor_auth: false,
      two_factor_secret: faker.string.alphanumeric(64),
      refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvaGFpZHVvbmdAZ21haWwuY29tIiwicm9sZSI6MCwicGhvbmUiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzA5MTEyNDY3LCJleHAiOjE3MDk3MTcyNjd9.6XOsho37RCTYvrwjSVcB5tqiPaYyIIQA_Z2dnKqzQZk',
      google_id: '',
      last_login_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // Seed products
  for (const product of productsData) {
    await prisma.product.create({
      data: {
        name: product.name ?? null,
        image: product.image ?? null,
        brand: product.brand ?? null,
        category: product.category ?? null,
        description: product.description ?? null,
        rating: product.rating ?? 0,
        num_reviews: product.numReviews ?? 0,
        price: product.price ?? null,
        count_in_stock: product.countInStock ?? null,
      },
    });
  }

  console.log('Data seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });