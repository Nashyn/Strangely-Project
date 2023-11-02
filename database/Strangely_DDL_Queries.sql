
-- -----------------------------------------------------
-- Table `strangely`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`user` (
  `userID` INT NOT NULL,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `countryCode` VARCHAR(3) NULL,
  `mobileNumber` CHAR(15) NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `joiningDate` DATE NULL DEFAULT NULL,
  `userName` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `streetAddress` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `postCode` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`group` (
  `groupId` INT NOT NULL,
  `groupName` VARCHAR(45) NULL DEFAULT NULL,
  `groupDescription` VARCHAR(45) NULL DEFAULT NULL,
  `groupAdmin` INT NULL DEFAULT NULL,
  PRIMARY KEY (`groupId`),
  INDEX `groupAdmin_idx` (`groupAdmin` ASC) VISIBLE,
  CONSTRAINT `groupAdmin`
    FOREIGN KEY (`groupAdmin`)
    REFERENCES `strangely`.`user` (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`post` (
  `postId` INT NOT NULL,
  `userId` INT NULL DEFAULT NULL,
  `postDate` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `postCategoryId` INT NULL DEFAULT NULL,
  `postLikeReaction` INT NULL DEFAULT NULL,
  `postLoveReaction` INT NULL DEFAULT NULL,
  `postDislike` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`postId`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `strangely`.`user` (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`images` (
  `imageId` INT NOT NULL,
  `postId` INT NULL DEFAULT NULL,
  `image` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`imageId`),
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `postId`
    FOREIGN KEY (`postId`)
    REFERENCES `strangely`.`post` (`postId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`message` (
  `groupId` INT NOT NULL,
  `senderId` VARCHAR(45) NULL DEFAULT NULL,
  `receiverId` VARCHAR(45) NULL DEFAULT NULL,
  `message` VARCHAR(45) NULL DEFAULT NULL,
  `timestamp` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`groupId`),
  CONSTRAINT `groupId`
    FOREIGN KEY (`groupId`)
    REFERENCES `strangely`.`group` (`groupId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`postcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`postcategory` (
  `postCategoryId` INT NOT NULL,
  `postCategoryName` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`postCategoryId`),
  CONSTRAINT `postCategoryId`
    FOREIGN KEY (`postCategoryId`)
    REFERENCES `strangely`.`post` (`postId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `strangely`.`usergroup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `strangely`.`usergroup` (
  `userId` INT NOT NULL,
  `groupId` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `userId2`
    FOREIGN KEY (`userId`)
    REFERENCES `strangely`.`user` (`userID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
