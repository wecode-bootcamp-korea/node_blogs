DROP TABLE IF EXISTS users, articles, comments;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(100) UNIQUE NOT NULL,
  `password` varchar(200) NOT NULL,
  `status` ENUM ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT "ACTIVE",
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT null
);

CREATE TABLE `articles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int UNIQUE NOT NULL,
  `title` varchar(200) NOT NULL,
  `body` varchar(2000) NOT NULL,
  `status` ENUM ('DRAFT', 'PUBLISHED', 'DELETED') NOT NULL DEFAULT "DRAFT",
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT null
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `article_id` int UNIQUE NOT NULL,
  `user_id` int UNIQUE NOT NULL,
  `body` varchar(1000) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT null
);

ALTER TABLE `articles` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
