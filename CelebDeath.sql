-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2015 at 11:50 AM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CelebDeath`
--

-- --------------------------------------------------------

--
-- Table structure for table `celebs`
--

CREATE TABLE IF NOT EXISTS `celebs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Handle` varchar(25) NOT NULL,
  `Name` varchar(25) NOT NULL,
  `Picture` varchar(255) NOT NULL,
  `Followers` int(11) NOT NULL,
  `HP` int(11) NOT NULL,
  `Level` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Handle` (`Handle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `celebs`
--

INSERT INTO `celebs` (`ID`, `Handle`, `Name`, `Picture`, `Followers`, `HP`, `Level`) VALUES
(1, '@KimKardashian', 'Kim Kardashian', 'https://i.imgur.com/XIeXUqK.jpg', 36400000, 10, 5),
(2, '@Cristiano', 'Cristiano Ronaldo', 'https://i.imgur.com/QnIFYJJ.png', 38600000, 10, 5),
(3, '@jtimberlake', 'Justin Timberlake', 'https://i.imgur.com/zNBcGkj.png', 49700000, 10, 5),
(4, '@rihanna', 'Rihanna Fenty', 'https://i.imgur.com/wumaf4Z.png', 52400000, 10, 5),
(5, '@taylorswift13', 'Taylor Swift', 'https://i.imgur.com/Bm4BgFX.png', 65700000, 10, 5),
(8, '@BarackObama', 'Barack Obama', 'https://i.imgur.com/I6wM7nR.png', 65600000, 10, 5),
(9, '@katypery', 'Katy Perry', 'https://i.imgur.com/8izCUxf.png', 77300000, 10, 5),
(10, '@justinbieber', 'Justin Bieber', 'https://i.imgur.com/tywIEbN.png', 69200000, 10, 5),
(11, '@BillGates', 'Bill Gates', 'https://i.imgur.com/BgjfAbM.png', 25400000, 10, 5),
(12, '@Beyonce', 'Beyonce Knowles', 'https://i.imgur.com/ZLxOXBA.png', 14100000, 10, 5),
(13, '@JimCarrey', 'Jim Carrey', 'https://i.imgur.com/rbEqZ98.png', 15200000, 10, 5),
(14, '@britneyspears', 'Britney Spears', 'https://i.imgur.com/m1VvYM9.png', 43300000, 10, 5);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE IF NOT EXISTS `inventory` (
  `UserID` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `CelebID` int(11) NOT NULL,
  PRIMARY KEY (`UserID`,`CelebID`),
  KEY `CelebID` (`CelebID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

CREATE TABLE IF NOT EXISTS `queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Session` text NOT NULL,
  `Attacker` text NOT NULL,
  `HP1` int(11) NOT NULL,
  `HP2` int(11) NOT NULL,
  `Tweet` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `Date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=85 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `oauth_uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `oauth_token` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `oauth_secret` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `experience` int(11) NOT NULL DEFAULT '0',
  `battles_won` int(11) NOT NULL DEFAULT '0',
  `battles_lost` int(11) NOT NULL DEFAULT '0',
  `level` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`oauth_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`oauth_uid`, `username`, `oauth_token`, `oauth_secret`, `picture`, `experience`, `battles_won`, `battles_lost`, `level`, `created`, `modified`) VALUES
('3694514357', 'kike_daddyo', '3694514357-yz7bZDC6yErmOlHDZLhCIAEHVidaffad8pY9c5T', 'DDeeN3agyYqFTXVdAB38FFP7vKdowYaB00sUanQKf68Sv', 'http://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png', 0, 0, 0, 0, '2015-10-20 16:40:28', '2015-11-23 14:36:00'),
('3804584416', 'DerpkingAlex', '3804584416-CofMwnXk9EneusB8Nn0cKuaaBmusjq101c6QMYK', '4yulZs4QvxvKeUwbshA3nMMMJTBlpHWbV0i5SB3RJreh8', '', 0, 0, 0, 0, '2015-11-05 21:00:06', '2015-11-20 16:14:19'),
('3825712936', 'Killacann1', '3825712936-9sU93P95dhIUrUHk7YGRPE2ZaJYVxJQnqBatiwW', 'ntpeXrPVuMQykhm7C5kid0ev36oxhiQGWUtnahpk2uDw1', '', 0, 0, 0, 0, '2015-11-12 17:33:34', '2015-11-18 16:53:04'),
('3841964542', 'SoggSoggan', '3841964542-ICQaj2gtNICcTDNCbArv5ysfECITKwTSQdCC6jZ', 'sZSSC74AjLXJpTaIXHpGT8FT8efkwu9loEgr6oPUYjYFv', 'http://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png', 0, 0, 0, 0, '2015-11-02 12:44:48', '2015-11-23 16:14:57'),
('48388791', 'johannesf95', '48388791-xRiDTGJhWDCBjcHWZYglEioHqdn6acScVPeaREdJo', '9ZDaxwTjAiXyxkBh1OHaKFTFou8qFBeQbkKxZYNuMVSGN', 'http://pbs.twimg.com/profile_images/431745775576821760/2C-BKMtD_normal.jpeg', 0, 0, 0, 0, '2015-10-23 04:10:18', '2015-11-06 08:39:47'),
('800521152', 'bluebirdjonesee', '800521152-IyTclOjU3XhCOWjz8d0HhL0o75rQ5CeAK74c6gYq', 'KvoLM7EJ9NxsxIp3vgITPHCxq8NfP9FaRsPlm2paNIAMC', 'http://abs.twimg.com/sticky/default_profile_images/default_profile_4_normal.png', 0, 0, 0, 0, '2015-10-20 17:09:55', '2015-11-12 14:36:30');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`oauth_uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`CelebID`) REFERENCES `celebs` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
