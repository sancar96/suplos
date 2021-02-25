-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-02-2021 a las 23:35:03
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `intelcost_bienes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wishes`
--

CREATE TABLE `wishes` (
  `idWishes` int(11) NOT NULL,
  `idJson` int(11) NOT NULL,
  `dataJson` varchar(500) COLLATE latin1_spanish_ci NOT NULL,
  `logicoDeleted` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `wishes`
--

INSERT INTO `wishes` (`idWishes`, `idJson`, `dataJson`, `logicoDeleted`, `created`, `updated`) VALUES
(3, 1, '{\"Id\":\"1\",\"Direccion\":\"Ap #549-7395 Ut Rd.\",\"Ciudad\":\"New York\",\"Telefono\":\"334-052-0954\",\"Codigo_Postal\":\"85328\",\"Tipo\":\"Casa\",\"Precio\":\"$30,746\"}', 0, 1614279044, 1614279044),
(10, 2, '{\"Id\":\"2\",\"Direccion\":\"P.O. Box 657, 9831 Cursus St.\",\"Ciudad\":\"Orlando\",\"Telefono\":\"488-441-5521\",\"Codigo_Postal\":\"04436\",\"Tipo\":\"Casa de Campo\",\"Precio\":\"$71,045\"}', 1, 1614280992, 1614283232),
(11, 10, '{\"Id\":\"10\",\"Direccion\":\"P.O. Box 497, 8679 Turpis. St.\",\"Ciudad\":\"New York\",\"Telefono\":\"870-559-3430\",\"Codigo_Postal\":\"7029\",\"Tipo\":\"Casa\",\"Precio\":\"$17,759\"}', 0, 1614281282, 1614282956);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `wishes`
--
ALTER TABLE `wishes`
  ADD PRIMARY KEY (`idWishes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `wishes`
--
ALTER TABLE `wishes`
  MODIFY `idWishes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
