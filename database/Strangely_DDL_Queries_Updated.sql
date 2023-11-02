SET FOREIGN_KEY_CHECKS=0; -- to disable them
CREATE TABLE IF NOT EXISTS `user` (
  `userID` INT NOT NULL,
  `username` INT NOT NULL,
  `first_name` VARCHAR(45) ,
  `last_name` VARCHAR(45) ,
  `phone_number` CHAR(15) ,
  `email` VARCHAR(45) ,
  `joining_date` DATE,
  `password` VARCHAR(45) ,
  `area_id` INT ,
  `reset_token` VARCHAR(45) ,
  PRIMARY KEY (`userID`)
) ;
SET FOREIGN_KEY_CHECKS=1; -- to enable them

CREATE TABLE IF NOT EXISTS `Area` (
  `area_id` INT NOT NULL,
  `area_name` INT NOT NULL,
  `latitude` DECIMAL(11,8),
  `longitude` DECIMAL(11,8),
  PRIMARY KEY (`area_id`),
  FOREIGN KEY (`area_id`) 
  REFERENCES `user` (`area_id`)
) ;


CREATE TABLE IF NOT EXISTS `Credentials` (
  `username` INT NOT NULL,
  `email` INT NOT NULL,
  `provider` VARCHAR(45),
  PRIMARY KEY (`username`)
) ;


CREATE TABLE IF NOT EXISTS `group` (
  `groupId` INT NOT NULL,
  `groupName` VARCHAR(45) ,
  `groupDescription` VARCHAR(45) ,
  `groupAdmin` INT ,
  PRIMARY KEY (`groupId`),
  INDEX `groupAdmin_idx` (`groupAdmin`),
  FOREIGN KEY (`groupAdmin`) REFERENCES `user` (`userID`)
);

CREATE TABLE IF NOT EXISTS `post` (
  `postId` INT NOT NULL,
  `userId` INT ,
  `postDate` VARCHAR(45) ,
  `description` VARCHAR(45) ,
  `postCategoryId` INT ,
  `postLikeReaction` INT ,
  `postLoveReaction` INT ,
  `postDislike` VARCHAR(45) ,
  PRIMARY KEY (`postId`),
  INDEX `userId_idx` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`userID`)
);

CREATE TABLE IF NOT EXISTS `images` (
  `imageId` INT NOT NULL,
  `postId` INT ,
  `image` LONGBLOB,
  PRIMARY KEY (`imageId`),
  INDEX `postId_idx` (`postId` ) ,
    FOREIGN KEY (`postId`)
    REFERENCES `post` (`postId`));
    
CREATE TABLE IF NOT EXISTS `message` (
  `groupId` INT NOT NULL,
  `senderId` VARCHAR(45) ,
  `receiverId` VARCHAR(45) ,
  `message` VARCHAR(45) ,
  `timestamp` VARCHAR(45) ,
  PRIMARY KEY (`groupId`),
    FOREIGN KEY (`groupId`)
    REFERENCES `group` (`groupId`));
    
CREATE TABLE IF NOT EXISTS `postcategory` (
  `postCategoryId` INT NOT NULL,
  `postCategoryName` VARCHAR(45) ,
  PRIMARY KEY (`postCategoryId`),
    FOREIGN KEY (`postCategoryId`)
    REFERENCES `post` (`postId`));
    
CREATE TABLE IF NOT EXISTS `usergroup` (
  `userId` INT NOT NULL,
  `groupId` VARCHAR(45) ,
  PRIMARY KEY (`userId`),
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`userID`));



