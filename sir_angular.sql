-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-02-2022 a las 20:29:44
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sir_angular`
--
CREATE DATABASE IF NOT EXISTS `sir_angular` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sir_angular`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipamiento`
--

DROP TABLE IF EXISTS `equipamiento`;
CREATE TABLE `equipamiento` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `detalles` text NOT NULL,
  `id_Personal` int(11) NOT NULL,
  `id_Evento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

DROP TABLE IF EXISTS `evento`;
CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `id_Personal` int(11) DEFAULT NULL,
  `id_Equipamiento` int(11) DEFAULT NULL,
  `id_Auto` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `categoria` varchar(60) NOT NULL,
  `detalles` text NOT NULL,
  `fechadia` int(11) NOT NULL,
  `fechames` int(11) NOT NULL,
  `frecuencia` int(2) NOT NULL,
  `repetir` tinyint(1) DEFAULT NULL,
  `diario` tinyint(1) DEFAULT NULL,
  `dia` tinyint(1) DEFAULT NULL,
  `mes` tinyint(1) DEFAULT NULL,
  `mensualmente` tinyint(1) DEFAULT NULL,
  `anualmemte` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notify`
--

DROP TABLE IF EXISTS `notify`;
CREATE TABLE `notify` (
  `id` int(11) NOT NULL,
  `contacto` varchar(60) NOT NULL,
  `id_Evento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE `personal` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `A_paterno` varchar(30) NOT NULL,
  `A_materno` varchar(30) NOT NULL,
  `id_Evento` int(11) NOT NULL,
  `id_Equipamiento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `birthday` date NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `nombres` varchar(60) NOT NULL,
  `A_paterno` varchar(40) NOT NULL,
  `A_materno` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `modelo` varchar(60) NOT NULL,
  `id_Evento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipamiento`
--
ALTER TABLE `equipamiento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Personal` (`id_Personal`),
  ADD UNIQUE KEY `id_Evento` (`id_Evento`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Personal` (`id_Personal`),
  ADD UNIQUE KEY `id_Equipamiento` (`id_Equipamiento`),
  ADD UNIQUE KEY `id_Auto` (`id_Auto`);

--
-- Indices de la tabla `notify`
--
ALTER TABLE `notify`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Evento` (`id_Evento`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Evento` (`id_Evento`),
  ADD KEY `id_Equipamiento` (`id_Equipamiento`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Evento` (`id_Evento`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipamiento`
--
ALTER TABLE `equipamiento`
  ADD CONSTRAINT `equipamiento_ibfk_2` FOREIGN KEY (`id_Personal`) REFERENCES `personal` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipamiento_ibfk_3` FOREIGN KEY (`id_Evento`) REFERENCES `evento` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_3` FOREIGN KEY (`id`) REFERENCES `personal` (`id_Evento`) ON DELETE CASCADE,
  ADD CONSTRAINT `evento_ibfk_4` FOREIGN KEY (`id_Equipamiento`) REFERENCES `equipamiento` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `evento_ibfk_5` FOREIGN KEY (`id_Auto`) REFERENCES `vehiculo` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notify`
--
ALTER TABLE `notify`
  ADD CONSTRAINT `notify_ibfk_1` FOREIGN KEY (`id_Evento`) REFERENCES `evento` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
