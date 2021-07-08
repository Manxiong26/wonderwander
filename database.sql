
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "users" (
	"id" SERIAL primary key NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"username" varchar(100) NOT NULL,
	"first_name" varchar(100) ,
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "sponsor" (
	"id" serial primary key NOT NULL,
	"name" varchar(500) NOT NULL,
	"logo" varchar(500),
	"description" varchar(5000),
	"site_link" varchar(5000),
	"donate_link" varchar(5000),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);
	
CREATE TABLE "collection" (
	"id" serial primary key NOT NULL,
	"name" varchar(200) NOT NULL,
	"image" varchar(5000),
	"city" varchar(100),
	"state" varchar(100),
	"bio" varchar(5000),
	"donate_link" varchar(5000),
	"site_link" varchar(5000),
	"search_text" varchar(500),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);
	
CREATE TABLE "artist" (
	"id" serial primary key NOT NULL,
	"name" varchar(150) NOT NULL,
	"image" varchar(5000),
	"bio" varchar(10000),
	"site_link" varchar(5000),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);
	
CREATE TABLE "artwork" (
	"id" serial primary key NOT NULL,
	"name" varchar(100) NOT NULL,
	"year" varchar(10),
	"lat" numeric(6,4),
	"lng" numeric(7,4),
	"image" varchar(5000),
	"description" varchar(5000),
	"vid_link" varchar(5000),
	"vid_description" varchar(5000),
	"artist_id" INT REFERENCES "artist" ON DELETE SET NULL,
	"sponsor_id" INT REFERENCES "sponsor" ON DELETE SET NULL,
	"collection_id" INT REFERENCES "collection" ON DELETE SET NULL,
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "users" ON DELETE CASCADE NOT NULL,
	"artwork_id" INT REFERENCES "artwork" ON DELETE CASCADE NOT NULL 
);

CREATE TABLE "artwork_seen" (
	"id" SERIAL PRIMARY KEY,
	"users_id" INT REFERENCES "users" ON DELETE CASCADE NOT NULL,
	"artwork_id" INT REFERENCES "artwork" ON DELETE CASCADE NOT NULL 
);

CREATE TABLE "quotes" (
	"id" SERIAL PRIMARY KEY,
	"quote" varchar(10000) NOT NULL,
	"quote_by" varchar(100),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "say" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(255) NOT NULL,
	"image" varchar(5000) NOT NULL
);

CREATE TABLE "activities" (
	"id" SERIAL PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"description" varchar(5000),
	"image" varchar(5000),
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "say_poll" (
	"id" SERIAL PRIMARY KEY,
	"say_id" INT REFERENCES "say" ON DELETE CASCADE NOT NULL,
	"artwork_id" INT REFERENCES "artwork" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "do" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(5000) NOT NULL,
	"artwork_id" INT REFERENCES "artwork" ON DELETE CASCADE,
	"activity_id" INT REFERENCES "activities" ON DELETE CASCADE,
	"published" BOOLEAN NOT NULL DEFAULT 'false'
);
	
CREATE TABLE "see" (
	"id" SERIAL PRIMARY KEY,
	"prompts" varchar(5000) NOT NULL,
	"link" varchar(5000),
	"image" varchar(5000),
	"artwork_id" INT REFERENCES "artwork" ON DELETE CASCADE,
	"activity_id" INT REFERENCES "activities" ON DELETE CASCADE,
	"published" BOOLEAN NOT NULL DEFAULT 'false'
); 

--- TEST DATA ---
INSERT INTO sponsor ("name", "logo", "description", "site_link", "published")
VALUES ('The Ackerberg Group', 'https://i1.wp.com/ackerberg.com/wp-content/uploads/2015/06/logo-2.0.png?fit=2048%2C1194&ssl=1', 'description', 'site_link', 'true'),
	   ('Edina Grill', 'http://static1.squarespace.com/static/5f87b83e172a3a4b76bfe50a/t/607840102395726bc38d93c4/1618493459772/edinagrill_logo.jpg?format=1500w', 'description', 'site_link', 'true'),
	   ('Edina Arts and Culture Commission, The Edina Community Foundation and Edina Public Schools Elementary art program', 'https://www.pngjoy.com/pngs/232/15806032_thumbnail-thumbnail-transparent-png.png', 'description', 'site_link', 'true'),
	   ('Edina Ed Fund, City of Edina Arts and Culture Commission', 'https://i.ytimg.com/vi/Wsz-9YWPzM8/maxresdefault.jpg', 'description', 'site_link', 'true');

INSERT INTO "collection" ("name", "image", "city", "state", "bio", "donate_link", "site_link", "search_text", "published")
VALUES ('City of Port St. Lucie', 'https://media-exp1.licdn.com/dms/image/C4D0BAQHLbwydGn-NeQ/company-logo_200_200/0?e=2159024400&v=beta&t=TAtEuK2D6MlTJTvlnggS42McDxeM27TyOzhjPrS6Is8', 'Port St. Lucie', 'FL', 'bio', 'https://artstlucie.org/donate', 'site_link', 'City of Port St. Lucie, FL Florida', 'true'),
	   ('Mozaic Uptown', 'https://pbs.twimg.com/profile_images/923257795008389120/kqnWUa_L_400x400.jpg', 'Minneapolis', 'MN', 'bio', 'donate_link', 'site_link', 'Mozaic Uptown Minneapolis MN Minnesota', 'true'),
	   ('City of Edina Arts & Culture Commission', 'https://d3926qxcw0e1bh.cloudfront.net/pages_avatar_photos/7e/a9/7ea90d60add7ee678b07131cf2a57d82.jpg', 'Edina', 'MN', 'Public art has been a priority in Edina since 2004. The Arts & Culture Commission oversees the City''s public art efforts and runs the Public Art Edina program. The City provides $10,000 annually as seed money to jump start projects, with additional funds coming from grants, and corporate and private donors.', 'https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=C67633M542AML', 'https://www.edinamn.gov/469/Public-Art', 'Edina Arts and Culture Edina MN Minnesota', 'true'),
	   ('Reese''s Collection', 'https://www.seekpng.com/png/detail/271-2716884_reeses-logo-png-transparent-reeses-peanut-butter-cup.png', 'Minneapolis', 'Minnesota', 'Reese curated this collection after pondering art while eating peanut butter filled chocolate cups.', 'https://artstlucie.z2systems.com/np/clients/artstlucie/donation.jsp', 'https://www.hersheyland.com/reeses', 'Peanut Butter', 'true'),
	   ('Shyla''s Collection', 'https://media.self.com/photos/5ea9f52ea469834e6f5489e6/1:1/w_3204,h_3204,c_limit/peony_flowers_bouquet.jpg', 'Minneapolis', 'Minnesota', 'Shyla loves art and herbalism and wants the world to know it!', 'https://artstlucie.z2systems.com/np/clients/artstlucie/donation.jsp', 'http://www.acorntooakherbal.com/', 'Acorn', 'true');
		
INSERT INTO artist ("name", "image", "bio", "site_link", "published")
VALUES ('John Doe', 'https://i.ytimg.com/vi/LguXG80DezY/maxresdefault.jpg', 'A talented but tormented artist.', 'https://en.wikipedia.org/wiki/The_Silence_of_the_Lambs_(film)', 'true'),
	   ('Pat Cochran', 'http://patcochran.com/home/wp-content/uploads/2011/08/Shadetree-Studio.jpg', 'Patrick Cochran was born and raised in Missouri, where he attended Southeast Missouri University and received a B. S. in Art Education. After relocating to Florida, Cochran worked in Luis Montoya''s fine arts foundry in West Palm Beach for three years, where he learned the art of bronze casting. He later taught art in Jupiter, Florida and in Fort Pierce, Florida. In 1993 he opened Shadetree Studio, a fine arts foundry, where he has cast for many well-known artists. Cochran has exhibited in Colorado, Missouri, Florida, Rhode Island, South Carolina, Washington, D. C. and New York City. He currently has two sculptures on display on Broward Boulevard in Fort Lauderdale, and a collaborative piece on the grounds of the Smithsonian Marine Center in Fort Pierce. He also has a 9-11 Firefighters Memorial sculpture installed at Digital Domain Field, the spring training facility for the New York Mets in Port Saint Lucie, Florida. Cochran''s sculptures are a mix of contemporary feelings and attitudes with a humorous slant. He enjoys exploring the mixed medias of various metals and concrete. Cochran is a member of the Board of Directors of the A. E. Backus Museum and Gallery. He resides in St. Lucie Village, Florida.', 'websitelink', 'true'),
	   ('Heidi Hoy', 'https://www.cityartmankato.com/assets/uploads/2017/04/Heidi-Hoy-6-199x300-170x205.jpg', 'I can trace my deep interest in sculpture back to the age of eight when my father was curator of the St. Paul Science Museum. It was then that I would spend my Saturdays watching museum artist Alex Oyio modeling the dioramas that would later be on display in the museum. As I grew up, my restless creative spirit found outlets in many forms. As a fashion model in my twenties, I moved into directing and co-producing choreographed shows involving dance, dress and hair design. My last show was staged at Parsons School of Design in New York, receiving a standing ovation. At thirty, I returned to college and placed first in the five-state region for set design in the American College Theater Festival. My work was exhibited in the Kennedy Center in Washington, DC. After receiving my Bachelor of Arts degree from Hamline University, I decided that sculpture, and particularly bronze casting, was the way I wished to spend my life. In order to learn all I could of the foundry arts, I asked Nick Legeros at the Minnetonka Center for the Arts if I could apprentice with him for a period of two years. This apprenticeship enabled me to learn bronze casting as well as positioning me to work with the students working there. As I grew up" artistically', 'websitelink', 'true'),
	   ('Lawrence Argent', 'https://upload.wikimedia.org/wikipedia/en/f/f6/Lawrence_Argent.jpg', 'Lawrence Argent (January 24, 1957 – October 4, 2017) was a visual artist known for his public artwork I See What You Mean, installed at the Colorado Convention Center. Argent was born on January 24, 1957 in Essex, England and grew up in Australia. He studied art at the Royal Melbourne Institute of Technology in Australia, and received his MFA in 1986, from the Rinehart School of Sculpture at the Maryland Institute, College of Art, in Baltimore, Maryland.[2]', 'site_link', 'true'),
	   ('Alan Milligan & Nicole Mary Milligan', 'https://myvillager.com/wp-content/uploads/2020/06/Better-Angels-5-copy.jpg', 'rish sculptor and educator Alan Milligan is best known for the Samuel Beckett bronze chess set commissioned by the Happy Days International Beckett Festival in Enniskillen. The work has been exhibited often, most recently in Paris at Jardin du Luxembourg, as part of a cultural exchange for the Centre Culturel Irlandais, and also at the Royal Hibernian Academy: Best of Irish Contemporary Art in Dublin and the Metropolitan Arts Centre in Belfast. Milligan, who studied sculpture on scholarship at Bath Spa University in Bath, England, is a part of Umha Aois, a collective of artists and archaeologists with, as their name suggests, a shared interest in all things copper, bronze, and of the Bronze Age. This tribe travels around Europe teaching and presenting public castings. His website is www.asmilligan.com. Dr. Nicole Mary Milligan (Novelist N.M. Kelby) is the critically acclaimed author of ten books including White Truffles in Winter and the New York Times bestseller In the Company of Angels. She is the subject of the French documentary Ecrire en résidence (Writer in Residence) and has been in residence at several communities including Yaddo, Passa Porta: International House of Literature (Brussels, Belgium) and Fondazione Giorgio Cini (Venice, Italy). She is the recipient of numerous grants and awards including a NEA InterArts grant, Bush Artist Fellowship in Literature, Florida Book Award, both Florida and Minnesota State Arts Board Fellowships. She has been toured and translated worldwide. www.nmkelby.com', 'www.themilliganstudio.com', 'true'),
	   ('Mac Anderson & Charles Morrill', 'https://bloximages.chicago2.vip.townnews.com/hometownsource.com/content/tncms/assets/v3/editorial/6/d8/6d801590-8b3f-11eb-a752-7b6d4e616ffe/6058e7092c544.image.jpg', 'Mac was 9 years old when he collaborated with Charles Morrill to make his concept into its current large scale. When he grows up he might like to work on designing modern buildings or modern homes as he really likes to use computers to build. "I hope this sculpture helps people feel like they belong and that they are an important part of the Edina community. After all, if they don''t stand in the sculpture to become the I in EDINA, then Edina is incomplete. I really enjoyed working with the sculptor, Charles Morrill. If I hadn''t done this project, I would not have had a chance to meet him and I really like him. My favorite part was building it in the wood shop and using the power tools. I learned how to use certain power tools, how to work together with the sculptor, and that a project of this size takes longer than you might think!" says Mac Anderson.', 'site_link', 'true'),
	   ('Sylvia Van Norman', 'image', 'Born in 2008, and 10 years old at the time of construction, Sylvia has a strong interest in art, cooking for people, the earth and animals. When she grows up she hopes to do something that combines art, math and science because they are her favorite subjects. She enjoyed getting to work on a large scale version of her sculpture with craftsman, Charles Morrill and learning to use power tools! She learned a lot through the building process about trial and error and perseverance! She enjoyed the experience and support of friends and family who helped with construction.', 'site_link', 'true'),
	   ('Caprice Glaser', 'https://images.custommade.com/uu8HvRkXTRhf7DmC1YLnvQL8N0Y=/custommade-photosets/77953/77953.59435.jpg', 'Caprice Glaser resides in St. Paul, Minnesota. For over 20 years, she has created 2-D and 3-D art for hospitals, parks, universities and corporate settings. Through her varied projects, Glaser has developed a clear understanding of the special role of artwork in helping to facilitate healing, especially among children. Her works are designed using a variety of media, ranging from oil paintings on canvas to metal sculptures. She holds a BFA in sculpture from the School of the Art Institute of Chicago.', 'capriceglaser.com', 'true'),
	   ('Johannes Gelert', 'https://upload.wikimedia.org/wikipedia/commons/8/87/Johannes_Gelert.jpg', 'bio', 'site_link', 'true'),
	   ('Jim Dehne', 'https://ptcreek.com/images/DSC_2555pcat200ss.JPG', 'Jim Dehne resides in Newton, Wisconsin and draws inspiration from the wildlife and flora of the Wisconsin countryside as well as the nature he observed while living and traveling across the country. Jim was born and raised on a dairy farm named Point Creek Farm, joined the Army after high school and served in Alaska for three years and stayed an additional four years enjoying the Great Northwest. He later returned to the lower 48 to take over the family farm.', 'http://www.ptcreek.com', 'true'),
	   ('Jacob Fjelde', 'https://media.snl.no/media/31211/standard_compressed_jakob-fjelde.jpg', 'bio', 'site_link', 'true'),
	   ('Katherine Nash', 'https://cla.umn.edu/sites/cla.umn.edu/files/nash4_small.png', 'Nash was an American artist and sculptor best known for computer art and direct and arc welding. Katherine Nash was the daughter of Carl and Elizabeth Flink of Minneapolis, Minnesota. She studied at the Minneapolis School of Art, the university and the Walker Art Center School. She married attorney Robert C. Nash in 1934. Professor Katherine Nash (1910–1982), a member of the Department of Art faculty from 1961–1976, proposed that the University of Minnesota Student Unions provide space and staffing for a university art gallery. The gallery bearing her name was founded in 1979. Originally located on the lower concourse of Willey Hall, the Minnesota Student Unions supervised the Nash Gallery until 1992 when the Department of Art assumed administration of the space. In the fall of 2003, the gallery moved to its current location in the Regis Center for Art.​', 'site_link', 'true'),
	   ('Kimber Fiebiger', 'https://lh3.googleusercontent.com/proxy/tIllfY7iUw0dE5SUD8M2m22Lb4H_zjZK9z37FFPorsBH3Am_cy9wygQg2-mPzANZz3LTJRZ2v2FNsy4PVH2ZbS-8jIACPQoZUYXqZsYqZxqHWM27Uxm1_kRT-V8vAgswIxjr436jivOI0T8q', 'Kimber Fiebiger creates bronze sculptures that range from fun and whimsical, to classical and contemporary. She lives in Minneapolis yet her sculptures have been sold all over the country where she has won numerous awards. Besides being a fabulous sculptor, Kimber has created a home/gallery/studio that will amaze and intrigue you upon viewing. Ask anyone who drives by her Gallery at E Franklin and S 31st Avenues. Her building has been described as having the artful complexity of Spanish designer Antonie Gaudi combined with the surreal nature of Pablo Picasso. Her recent outdoor landscape brings to mind playful images of Dr. Seuss and the imagination of Lewis Carroll.', 'artbykimber.com', 'true'),
	   ('Nicholas Legeros', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Nicholas_Legeros%2C_sculptor.jpg', 'Nicholas Legeros has a Masters of Fine Arts degree from the University of Minnesota. For over twenty years he was an Artist-in-Residence and instructor at the Minnetonka Center for the Arts. He also taught at Metropolitan State University, Breck Schools, and the Edina Art Center. Eleven years ago Mr. Legeros left teaching to pursue a full-time career as a sculptor. His recent large commissions include a statue of Goldy Gopher for Coffman Union; Sid Hartman for the Target Center; and a 17 ft. high statue of St. Joseph for St. Joseph''s Hospital. Mr. Legeros served on the board of the Northeast Minneapolis Arts Association (NEMAA) for seven years (three as President) and five years on the board of the Northeast Community Development Corporation.', 'http://nikosculpture.com/', 'true');

INSERT INTO artwork ("name", "year", "lat", "lng", "image", "description", "vid_link", "vid_description", "artist_id", "sponsor_id", "collection_id", "published")
VALUES ('I see what you mean', 'year', '39.743605', '-104.995274', 'https://upload.wikimedia.org/wikipedia/en/8/82/I_See_What_You_Mean_LCCN2015633445.jpg', 'The 40-foot tall Blue Bear, designed by Lawrence Argent is formally named "I See What You Mean™." The Bear can be found peering into the Colorado Convention Center and has become a favorite of tourists and locals alike. Argent felt it important to focus on what it is like to be a resident in Denver when a convention is taking place. "I''m always interested in what might be going on in there, the exchange of information, ideas, and ideologies but there''s never really any indication from the outside what''s going on inside." In the process of brainstorming, the city was going through a period of drought and bears would venture into the city. After seeing a photo of a black bear looking into someone''s window from a local newspaper, Argent saw the ultimate resemblance of "curiosity" and the idea of a curious bear never left his mind. Now that the idea of a bear came into play, Mr. Argent wanted his bear to have a unique texture similar to the toys his sons played with which inspired the idea of a toy bear look. In presenting the concept to the selection committee, the blue 3D modeling clay he used intrigued everyone so much that it ultimately became the bear''s trademark. With combining Argent''s passion for regional western art with a non-resident''s perspective of curiosity, the story of how the Colorado Convention Center''s Blue Bear known as I See What You Mean has not only become one of the iconic symbols of the Colorado Convention Center, but also an iconic symbol of the city itself.', null, null, 4, null, null, 'true'),
	   ('Venus in Ventus', 'year', '44.950106', '-93.297017', 'https://i2.wp.com/ackerberg.com/wp-content/uploads/2014/11/Bronzes1.jpg?resize=350%2C350&ssl=1', 'Love on the Wind. The sculptures that I like to make and that define me as an artist are those of women, torn open and illusive, expressing a range of strong, uplifting emotions. My inspiration does not strike like lightning, rather it reveals itself to me as the sculpted form takes shape in my hands. Venus in Ventus began with the intent of depicting the emotion of joy, but in the end, became the messenger of love, taking flight on the winds. Venus" after the Roman goddess of love and beauty: "In Ventus" meaning "on the wind". Love on the wind is what our world needs and what my sculptures express.  Heidi Hoy', null, null, 3, 1, 2, 'true'),
	   ('Mona Lisa', '1503', '44.9681', '93.2886', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1200px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', 'A simple picture during simpler times', 'monalisa.com', 'This has literally nothing to do with the painting', 1, 1, 1, 'true'),
	   ('Leap of Faith', 'year', '27.447635604171282', '-80.32600106994082', 'https://artstlucie.org/wp-content/uploads/2018/08/Taking-the-Dive.jpg', 'In 2009, after entering a competition for a work of art for the new downtown Ft. Pierce parking garage. Pat Cochran was awarded the commission . The piece represents our beautiful city, Ft. Pierce, the oldest city on the treasure coast, having seen its share of history, but looking into a prophetic rosy future.  Leap of Faith took four months to complete and consists of 3,000 pounds of bronze.', null, null, 2, 1, null, 'true'),
	   ('Spaulding', 'year', '44.91189153397999', '-93.32904656902083', 'https://www.edinamn.gov/ImageRepository/Document?documentID=1216', 'A bronze sculpture of a dog.', 'https://youtu.be/sY6TXeM9PnU', 'Heidi Hoy: Foundry Dance', 3, 2, 3, 'true'),
	   ('School of (Fish)', '2019', '44.864413', '-93.326561666', 'https://www.edinamn.gov/ImageRepository/Document?documentID=7500', '2019, Bronze, Steel, Glass', null, null, '5', '3', null, 'true'),
	   ('A Reflection of Me', '2018', '44.874586', '-93.325344', 'https://www.edinamn.gov/ImageRepository/Document?documentID=5539', 'This bronze figure is 48in and is placed on a 1ft pedestal. It has a predominantly matte finish except for the mirror-like high polish on the face and heart. The sculpture you see is a large scale replica of the  student artist''s original maquette designed for a district wide elementary school call for art with the theme, "I am".', null, null, null, 4, null, 'true'),
	   ('I in Edina', '2018', '44.873292', '-93.325451', 'https://www.edinamn.gov/ImageRepository/Document?documentID=5541', 'Concord Elementary student, Mac Anderson designed "The I in Edina," which features oversized green building blocks that create the letters E, D, N, A. Visitors who stand in the center on the foot prints become the "I" in Edina. Anderson built the sculpture with Charles Morrill. "My idea came from a home remodeling show located in Indianapolis. The hosts were using their bodies to try and spell "Indy". When I saw them stand up straight to make the "I", I got the idea for the "I" in Edina.', null, null, 6, 4, null, 'true'),
	   ('Walking Through Rainbows', '2018', '44.876140', '-93.325290', 'https://www.edinamn.gov/ImageRepository/Document?documentID=5540', 'This sculpture is constructed with corrugated clear polycarbonate and wood. The height is 6 ft tall on the high side and 4 ft wide. There are colorful triangles between the layers of polycarbonate that create a stained glass feel that envelopes you in color as you move through the sculpture. It is meant to be welcoming and interactive. The floor is covered with artificial grass and there are ramps at the entrance and exit. When asked about how this work responded to the call for art, ''I am'', artist Sylvia Van Norman responded, "I love color! I am changing all the time and I am colorful. You get different perspectives on the same thing depending on where you stand.', null, null, 7, 4, null, 'true'),
	   ('Faces of Rondo', '2013', '44.964648', '-93.136805', 'http://fosterwilley.com/assets/img/projects/victoria-alt/vic3.jpg', '"Faces of Rondo" commemorates the individuals past and present, who have contributed to the historic Rondo community of St. Paul, MN and beyond. Sixteen over life size sculpted portraits in low relief acknowledge each person and their efforts. The community of Rondo and the Station Art Committee were directly involved in the selection of these individuals. The station artwork also includes narrative.', null, null, null, null, null, 'true'),
	   ('Spirit of Peace', '2006', '44.928697', '-93.296043', 'http://4.bp.blogspot.com/_ThEcwMGXYi8/S9pTk3c0i3I/AAAAAAAAAPI/ndKZDdcnaRM/s1600/004.JPG', 'The garden features The Spirit of Peace, a bronze sculpture by local artist Caprice Glaser, dedicated in 2006.The sculpture portrays the ancient craft of origami and illustrates the folding of a peace crane. The walking path around the sculpture has origami paper and information plaques on peace stones that depict the steps in making a peace crane enabling visitors to create their own. Words of peace in 23 languages are engraved on stones at the base. The sculpture represents the international tradition honoring Sadako Saski, a girl who developed cancer as a result of radiation released by the atomic bomb dropped on Hiroshima. Told of a Japanese legend that people who fold a thousand paper cranes will be granted a wish, she folded over one thousand cranes before her death at age 12.', null, null, 8, null, null, 'true'),
	   ('I See What You Mean', '2005', '39.743605', '-104.995274', 'https://upload.wikimedia.org/wikipedia/en/8/82/I_See_What_You_Mean_LCCN2015633445.jpg', 'The 40-foot tall Blue Bear, designed by Lawrence Argent is formally named "I See What You Mean™." The Bear can be found peering into the Colorado Convention Center and has become a favorite of tourists and locals alike. Argent felt it important to focus on what it is like to be a resident in Denver when a convention is taking place. "I''m always interested in what might be going on in there, the exchange of information, ideas, and ideologies but there''s never really any indication from the outside what''s going on inside." In the process of brainstorming, the city was going through a period of drought and bears would venture into the city. After seeing a photo of a black bear looking into someone''s window from a local newspaper, Argent saw the ultimate resemblance of "curiosity" and the idea of a curious bear never left his mind. Now that the idea of a bear came into play, Mr. Argent wanted his bear to have a unique texture similar to the toys his sons played with which inspired the idea of a toy bear look. In presenting the concept to the selection committee, the blue 3D modeling clay he used intrigued everyone so much that it ultimately became the bear''s trademark. With combining Argent''s passion for regional western art with a non-resident''s perspective of curiosity, the story of how the Colorado Convention Center''s Blue Bear known as I See What You Mean has not only become one of the iconic symbols of the Colorado Convention Center, but also an iconic symbol of the city itself.', null, null, 4, null, null, 'true'),
	   ('Jon Stevens', '1912', '44.913968', '-93.210039', 'https://minneapolisparkhistory.files.wordpress.com/2011/08/stevens-statue-at-portland-and-sixth-in-1912-hibbard-mh5-9-mp6-p32.jpg?w=480', '', null, null, 9, null, null, 'true'),
	   ('Peacock Display', 'year', '44.875858', '-93.325392', 'https://www.edinamn.gov/ImageRepository/Document?documentID=1191', '"Peacock Display" is a representational piece made entirely of intricately shaped iron. This large, modern work represents two male peacocks displaying for the attention of a female. In an outdoor setting, the work spans over 9 feet long, just less than 4 feet high and weighs approximately 120 pounds. The iron is painted black with copper highlights.', null, null, 10, null, null, 'true'),
	   ('Hiawatha and Minnehaha', '1911', '44.9154592', '-93.2114653', 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Hiawatha_and_Minnehaha.jpg', 'Statue of Hiawatha (Longfellow''s Hiawatha) carrying Minnehaha at Minnehaha Park in Minneapolis, Minnesota. Erected in 1911 by means of funds raised through the efforts of Mrs. L.P. Hunt of Mankato, and contributed principally by the school children of Minnesota. In 1855, Henry Wadsworth Longfellow published a book-length poem entitled The Song of Hiawatha. Longfellow never visited Minnesota, but he set his poem among the Dakota and Ojibwe people of the region. The poem''s story line was based on traditional Haudenosaunee (Iroquois) tales, as recorded, sometimes incorrectly, by Henry Rowe Schoolcraft. The Song of Hiawatha was widely read and had significant cultural influence in the United States through the rest of the nineteenth century and into the twentieth century.', null, null, 11, null, null, 'true'),
	   ('Horse Play', 'year', '44.912614', '-93.331974', 'https://ptcreek.com/images/DSC_2568pcat200.JPG', '"Horse Play" is a representational piece made entirely of intricately shaped iron. This large, modern work weighs approximately 200 pounds and stands almost 9 feet tall, over 9 feet long and 7 feet wide. "Horse Play" is part of a rotating exhibition of sculptures and is eligible for the 2016 - 2017 People''s Choice Award. The piece can be purchased for personal acquisition or as a gift to the City for $9,500.', null, null, 10, null, null, 'true'),
	   ('Heritage of Edina', '1968', '44.908304', '-93.355339', 'https://www.hclib.org/-/media/Hennepin-Library/about-library/Art/Edina/Ed_Nash-Katherine_Heritage-of-Edina_View2_710.jpg', 'This 11-foot copper sculpture offers an ode to Edina, contained in layers of symbolism. To start, the sculpture''s two big vertical elements represent old American Indian trails that still exist today—now known as Vernon Avenue and Valley View Road. Nearby Nine Mile Creek and Minnehaha Creek both get a nod, as does Hennepin County''s first mill, represented by the sculpture''s circular discs (millstones). There''s also thistle, shamrock and clover to honor Edina''s early settlers from Scotland and Ireland. This notable sculpture comes from a notable woman, Katherine Nash, whose name still appears on an art gallery at the University of Minnesota—and in the memories of many Minnesotans.', null, null, 12, null, null, 'true'),
	   ('Egghead', 'year', '44.907575', '-93.355180', 'https://media-cdn.tripadvisor.com/media/photo-p/18/7c/f9/9f/egghead-by-kimber-fiebiger.jpg', 'description', null, null, 13, null, null, 'true'),
	   ('The Glamorous Days of Flight', 'year', '44.870266', '-93.325842', 'https://www.edinamn.gov/ImageRepository/Document?documentID=1221', '"The Glamorous Days of Flight" depicts a family boarding an aircraft in the 1960s, when flying was novel and prestigious. This sculpture is one of two pieces recognizing the late Edina-resident Donald Nyrop, former CEO of Northwest Airlines, and the contributions the men and women of Northwest Airlines gave to the growth of commercial aviation.', null, null, 14, null, null, 'true'),
	   ('Dreams take Flight', 'year', '44.870025', '-93.325790', 'https://www.edinamn.gov/ImageRepository/Document?documentID=1146', '"Dreams Take Flight" depicts a five-year-old boy and a 10-year-old girl dreaming of the future of aviation. The airplanes represented in this sculpture are a Convair 580 and a Boeing 747. This sculpture is one of two pieces recognizing the late Edina-resident Donald Nyrop, former CEO of Northwest Airlines, and the contributions the men and women of Northwest Airlines gave to the growth of commercial aviation.', null, null, 14, null, null, 'true');

INSERT INTO quotes ("quote", "quote_by", "published")
VALUES ('A work of art which did not begin in emotion is not art.', 'Paul Cezanne', 'true'),
	   ('One who wonders discovers that this in itself is wonder.', 'M.C. Escher', 'true'),
	   ('Once we believe in ourselves we can risk curiosity, wonder, spontaneous delight or any experience that reveals the human spirit.', 'e.e. cummings', 'true'),
	   ('One has to awaken to wonder.', 'Ludwig Wittgenstein', 'true'),
	   ('I believe that curiosity, wonder, and passion are defining qualities of imaginative minds and great teachers.', 'Kay Redfield Jamison', 'true'),
	   ('Carpe Diem', 'Horace', 'true'),
	   ('Every day is truely a beautiful day, if you know how to look at it.', 'Miss Shyla Ann', 'true');

INSERT INTO activities ("title", "description", "image", "published")
VALUES ('Walker Art Museum', 'World-class contemporary art center in Minneapolis, MN.', 'https://walker-web.imgix.net/cms/WAC-Herzog-d-Meuron-expansion.jpg?auto=format,compress&fit=crop&crop=faces&w=580&h=362&dpr=1.5', 'true'),
	   ('Bde Maka Ska', 'Big Lake', 'https://www.minnpost.com/wp-content/uploads/sites/default/files/imagecache/article_detail/images/articles/LakeCalhounSailboats640_2_0_0.jpg', 'true'),
	   ('Collect Sea Shells', 'Make a trip to a large body of water.', 'https://cdn.shopify.com/s/files/1/1172/4574/products/CAB974_grande.jpg?v=1517670827', 'true'),
	   ('Valleyfair', 'Close your eyes and paint your experience riding a rollercoaster.', 'https://www.exploreminnesota.com/sites/default/files/listing_images/84fd7aa01e1f417bef04d663f0588927b3e67c52_34.jpg', 'true');

INSERT INTO see ("prompts", "link", "image", "artwork_id", "activity_id", "published")
VALUES('Look at how the colors have been dulled over time. Imagine what they may have originally looked like.', 'https://www.youtube.com/watch?v=GyT1wPQSER8', 'image', 1, null, 'true'),
	  ('Checkout the texture and form. What might you do different?', 'link', 'image', null, 1, 'true'),
	  ('What may have inspired the artist to use this paricular medium?', 'link', 'image', 1, null, 'true'),
	  ('Watch this video on using bronze to create sculptures.', 'https://www.youtube.com/watch?v=yNcbdspjCeM', 'image', 5, null, 'true'),
	  ('Although this is not a kinetic sculpture, it gives the sense of movement. What aspects of the sculpture create this sense of movement?', null, null, 6, null, 'true'),
	  ('Look closely at the glass fish, what does it make you think of? How do you think they were they created?', null, null, 6, null, 'true'),
	  ('Look at the variety of fish in this sculpture. How many of each can you find?', null, null, 6, null, 'true'),
	  ('Look into the face of the figure. See yourself reflected there.', null, null, 7, null, 'true'),
	  ('Learn about the history of bronze.', 'https://www.youtube.com/watch?v=W8GmKJXoTO8', null, 7, null, 'true'),
	  ('Look closely at the construction of each block. How do you think they are assembled? How much do you guess it would weigh?', null, null, 8, null, 'true'),
	  ('How do you think the large scale child''s letter blocks impacts the power or meaning of this sculpture?', null, null, 8, null, 'true'),
	  ('Look closely at the sculpture from different angles. Which is your favorite viewpoint and why?', null, null, 9, null, 'true'),
	  ('Visit this sculpture at different times of day. How does the intensity of the colors change and move throughout the day?', null, null, 9, null, 'true'),
	  ('Look closely at the relief sculptures that make up the Faces of Rondo. Compare and contrast these Community Portraits with the relief sculptures you have surely seen donning exterior walls and doorways of government and religious buildings.', null, null, 10, null, 'true'),
	  ('Take out a US coin and study the bas relief. Consider the face on the coin and those in Faces of Rondo. How are their contributions to our country similar and different?', null, null, 10, null, 'true'),
	  ('Watch a two minute video of artist Eugene Daub creating a bas relief portrait!', 'https://www.youtube.com/watch?v=6HVdhBHCH5Q', null, 10, null, 'true'),('Watch an interview with artist Caprice Glaser and hear about what she calls the mystery and spontaneity of art.', 'https://www.youtube.com/watch?v=yUNX45J0v48', 'image', 11, null, 'true'),
	  ('Watch this video for step by step crane folding directions...Fold along!', 'https://www.youtube.com/watch?v=yTY-nGYYq_c', 'image', 11, null, 'true'),
	  ('Notice the scale, geometric planes and the intense blue color that make up bear. How do you think these aspects help to create the mood of this sculpture?', null, null, 12, null, 'true'),
	  ('What feeling would this sculpture evoke if it was realistic in size, color and texture? Would it have become a city icon?', null, null, 12, null, 'true'),
	  ('Study the three Peacocks. Compare and contrast them. What Story do they tell?', null, null, 14, null, 'true'),
	  ('A triptych is a set of three associated artistic, literary, or musical works intended to be appreciated together. Would you consider these a triptych?', null, null, 14, null, 'true'),
	  ('Did you know that the Peacock is the national bird of India? Check it out!', null, null, 14, null, 'true'),
	  ('Look closely at the sculpture which was erected in 1912. Find ways that it has been impacted by its 100+ years. How has it maintained it''s original beauty?', null, null, 15, null, 'true'),
	  ('Can you tell how this was created by looking at the details?', null, null, 16, null, 'true'),
	  ('Notice the lines created by the steel rods in these sculptures. How do the lines help to describe the energy of the horses? How would the sculpture feel if the lines were all horizontal or vertical?', null, null, 16, null, 'true'),
	  ('Look closely at this sculpture at the variety of shapes and textures.', null, null, 17, null, 'true'),
	  ('Hear why the artist got started making Humpty sculpture!', 'https://www.youtube.com/watch?v=bqCUxolXsWg', null, 18, null, 'true'),
	  ('Look at the expression on Egghead''s face. What does that tell you about his personality? What else can you learn from studying him?', null, null, 18, null, 'true'),
	  ('Notice the outfits the family wears. How does our current culture dress for air travel?', null, null, 19, null, 'true'),
	  ('The artist Nick Legeros has made many sculptures in the Twin Cities. His Goldy Gopher at the University of MN is beloved. Watch the video to learn about the steps to get Goldy from a clay design to a bronze sculpture.', null, null, 20, null, 'true');

INSERT INTO "do" ("prompts", "artwork_id", "activity_id", "published")
VALUES ('Make a self portrait!', 1, null, 'true'),
	   ('Make a paper mache mask.', null, 1, 'true'),
	   ('Think about the prompt "Better Together". Sketch a design which visually shows what better together means to you.', 6, null, 'true'),
	   ('Student artist Alex Wyatt: "I hope it makes [the viewer] think about how a school of fish works and how they can help be a stronger part of their community.', 6, null, 'true'),
	   ('Take a selfie with your face reflected into the face of the sculpture.', 7, null, 'true'),
	   ('This sculpture has an interactive element to it. Ayana hopes that the community will look at their reflection and reflect on what kind of person they are.', 7, null, 'true'),
	   ('Create an artwork in your choice of media that requires the viewer to self reflect. Share it with a friend and discuss.', 7, null, 'true'),
	   ('Stand as the ''I'' in Edina and get your picture taken!', 8, null, 'true'),
	   ('Mac Anderson, the artist, want(s) people to realize how important they are to Edina and hope(s) that they are inspired to become active and engaged in the community. Take a class, volunteer, go to a city event!', 8, null, 'true'),
	   ('Stand as the ''I'' in Edina. How does standing inside the sculpture make you feel?', 8, null, 'true'),
	   ('Walk through the sculpture and pause inside. How do the colors make you feel? How would it change in different seasons or times of day?', 9, null, 'true'),
	   ('Take a picture through the colorful walls. Take photos from different perspectives.', 9, null, 'true'),
	   ('The artist said that she is a colorful person and felt that ''Walking Through Rainbows'' expressed her personality. Make a sculpture that expresses your personality. What colors will you use?', 9, null, 'true'),
	   ('Take a selfie on this platform. How might you contribute to the Rondo community as others have?', 10, null, 'true'),
	   ('This artwork was a collaboration between artist Foster Willey and his brother, architect Guy Willey of Brooklyn, N.Y. Collaborate on something creative with a family member.', 10, null, 'true'),
	   ('Take a set of photos of the artwork from different angles', 1, null, 'true'),
	   ('Take a photo of yourself and the artwork.', 2, null, 'true'),
	   ('Start a conversation with a friend about this artwork.', 2, null, 'true'),
	   ('Ask yourself 3 questions related to this artwork.', 3, null, 'true'),
	   ('Make a list of your three favorite things about this artwork.', 3, null, 'true'),
	   ('Create a drawing of your adventure.', null, 2, 'true'),
	   ('Build a sculpture with your shells.', null, 3, 'true'),
	   ('Create a companion sculpture to this sculpture. What medium would you use? Why?', 5, null, 'true');

INSERT INTO say ("prompts", "image")
		VALUES('Took a long time to make!', 'https://i.pinimg.com/originals/0f/00/e1/0f00e1fdbdc45f7abeac51108dc6e804.png'),
		('Worth a lot of money!', 'https://img.pngio.com/money-icons-free-download-png-and-svg-money-icon-png-200_200.png'),
		('This was a great idea!', 'https://www.freeiconspng.com/thumbs/idea-icon/idea-icon-4.png'),
		('Skillful and well executed.', 'https://www.pngrepo.com/png/90895/512/paintbrush.png'),
		('I feel a connection to this piece.', 'https://img.pngio.com/multimedia-connectivity-connections-connector-interface-connection-icon-png-512_512.png'),
		('I find it confusing.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Noun_Project_question_mark_icon_1101884_cc.svg/1200px-Noun_Project_question_mark_icon_1101884_cc.svg.png');
		

		