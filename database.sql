
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
	"id" SERIAL primary key NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(1000) NOT NULL,
	"username" varchar(100) UNIQUE NOT NULL,
	"first_name" varchar(100),
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);


CREATE TABLE "sponsor" (
	"id" serial primary key NOT NULL,
	"name" varchar(100) NOT NULL,
	"logo" varchar(150),
	"description" varchar(500),
	"site_link" varchar(200),
	"donate_link" varchar(200),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
	);
	
CREATE TABLE "collection" (
	"id" serial primary key NOT NULL,
	"name" varchar(50) NOT NULL,
	"image" varchar(255),
	"city" varchar(50),
	"state" varchar(50),
	"bio" varchar(500),
	"donate_link" varchar(200),
	"site_link" varchar(200),
	"search_text" varchar(500),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);


	
CREATE TABLE "artist" (
	"id" serial primary key NOT NULL,
	"name" varchar(150) NOT NULL,
	"image" varchar(200),
	"bio" varchar(500),
	"site_link" varchar(255),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
	);


	
CREATE TABLE "artwork" (
	"id" serial primary key NOT NULL,
	"name" varchar(100) NOT NULL,
	"year" varchar(10),
	"lat" varchar(255),
	"long" varchar(255),
	"image" varchar(255),
	"description" varchar(500),
	"vid_link" varchar(255),
	"vid_description" varchar(500),
	"artist_id" INT REFERENCES "artist",
	"sponsor_id" INT REFERENCES "sponsor",
	"collection_id" INT REFERENCES "collection",
	"published" BOOLEAN NOT NULL DEFAULT 'false'
	);
	

CREATE TABLE "favorites(STRETCH)" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "users" NOT NULL,
	"artwork_id" INT REFERENCES "artwork" NOT NULL
);





CREATE TABLE "artwork_seen(STRETCH)" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "users" NOT NULL,
	"artwork_id" INT REFERENCES "artwork" NOT NULL
);


CREATE TABLE "quotes" (
	"id" SERIAL PRIMARY KEY,
	"quote" varchar(400) NOT NULL,
	"quote_by" varchar(100),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);
CREATE TABLE "say" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(255) NOT NULL
);
CREATE TABLE "activities" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"description" varchar(500),
	"image" varchar(250),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);



CREATE TABLE "say_poll" (
	"id" SERIAL PRIMARY KEY,
	"say_id" integer NOT NULL,
	"artwork_id" INT REFERENCES "artwork",
	"activity_id" INT REFERENCES "activities"
);

CREATE TABLE "do" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(500) NOT NULL,
	"artwork_id" INT REFERENCES "artwork",
	"activity_id" INT REFERENCES "activities"
);

	
CREATE TABLE "see" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(500) NOT NULL,
	"link" varchar(255),
	"artwork_id" INT REFERENCES "artwork",
	"activity_id" INT REFERENCES "activities"
); 

--- TEST DATA ---
INSERT INTO activities ("title", "description", "image", "published")
			VALUES ('Walker Art Museum', 'World-class contemporary art center in Minneapolis, MN.', 'https://walker-web.imgix.net/cms/WAC-Herzog-d-Meuron-expansion.jpg?auto=format,compress&fit=crop&crop=faces&w=580&h=362&dpr=1.5', 'true');


INSERT INTO sponsor ("name", "logo", "description", "site_link", "donate_link", "published")
			VALUES ('Reese', 'https://i1.sndcdn.com/avatars-000456331305-9hhohl-t500x500.jpg', 'The person who is sponsoring this art!!!', 'https://reesekling.wordpress.com/', 'https://reesekling.wordpress.com/', 'false');

INSERT INTO collection ("name", "image", "city", "state", "bio", "donate_link", "site_link", "search_text", "published")
			VALUES ('Reese''s Collection', 'https://images-na.ssl-images-amazon.com/images/I/81BEbFvmE-L._SL1500_.jpg', 'Minneapolis', 'Minnesota', 'Reese curated this collection after pondering art while eating peanut butter filled chocolate cups.', 'https://reesekling.wordpress.com/', 'https://www.hersheyland.com/reeses', 'Peanut Butter', 'true');
			

INSERT INTO artist ("name", "image", "bio", "site_link", "published")
			VALUES ('John Doe', 'https://i.ytimg.com/vi/LguXG80DezY/maxresdefault.jpg', 'A talented but tormented artist.', 'https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(film)', 'true');
			
INSERT INTO artwork ("name", "year", "lat", "long", "image", "description", "vid_link", "vid_description", "artist_id", "sponsor_id", "collection_id", "published")
VALUES ('Mona Lisa', '1503', '44.9681', '93.2886', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', 'A simple picture during simpler times', 'monalisa.com', 'This has literally nothing to do with the painting', 1, 1, 1, 'true'),
		('Leap of Faith', null, '27.447635604171282', '-80.32600106994082', 'https://artstlucie.org/wp-content/uploads/2018/08/Taking-the-Dive.jpg', 'In 2009, after entering a competition for a work of art for the new downtown Ft. Pierce parking garage. Pat Cochran was awarded the commission . The piece represents our beautiful city, Ft. Pierce, the oldest city on the treasure coast, having seen its share of history, but looking into a prophetic rosy future.  Leap of Faith took four months to complete and consists of 3,000 pounds of bronze.', null, null, null, 1, 1, 'true'),
		('Spaulding', null, '44.91189153397999', '-93.32904656902083', 'https://www.edinamn.gov/ImageRepository/Document?documentID=1216', 'A bronze sculpture of a dog.', 'https://youtu.be/sY6TXeM9PnU', 'Heidi Hoy: Foundry Dance', null, 1, 1, 'true');

INSERT INTO "do" ("prompts", "artwork_id", "activity_id")
VALUES ('Make a self portrait!', 1, null),
		('Make a paper mache mask.', null, '1');
		
INSERT INTO see ("prompts", "link", "artwork_id", "activity_id")
		VALUES('Look at how the colors have been dulled over time. Imagine what they may have originally looked like.', 'https://www.youtube.com/watch?v=GyT1wPQSER8', 1, null),
				('Make sure to check out the Sculpture Garden!', null, null, 1);


INSERT INTO say ("prompts")
		VALUES('Took a long time to make!'),
		('Worth a lot of money!'),
		('This was a great idea!'),
		('Skillful and well executed.'),
		('I feel a connection to this piece.'),
		('I find it confusing.');
		
INSERT INTO quotes ("quote", "quote_by", "published")
		VALUES('A work of art which did not begin in emotion is not art.', 'Paul Cezanne', 'true');
		