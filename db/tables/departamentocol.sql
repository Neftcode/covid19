-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 02-Nov-2020 às 15:00
-- Versão do servidor: 5.6.49-cll-lve
-- versão do PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `nfcovid`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `departamentocol`
--

CREATE TABLE `departamentocol` (
  `id` int(2) NOT NULL,
  `dep_cod_dane` int(2) NOT NULL,
  `dep_nombre` varchar(60) NOT NULL,
  `dep_regdnp_id` int(1) NOT NULL COMMENT 'Región DNP',
  `dep_regnat_id` int(1) NOT NULL COMMENT 'Región NAT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `departamentocol`
--

INSERT INTO `departamentocol` (`id`, `dep_cod_dane`, `dep_nombre`, `dep_regdnp_id`, `dep_regnat_id`) VALUES
(1, 0, 'Sin definir', 1, 1),
(2, 91, 'Amazonas', 4, 2),
(3, 5, 'Antioquia', 5, 3),
(4, 81, 'Arauca', 6, 5),
(5, 88, 'Archipiélago de San Andrés, Providencia y Santa Catalina', 2, 4),
(6, 8, 'Atlántico', 2, 4),
(7, 11, 'Bogotá D.C.', 3, 3),
(8, 13, 'Bolívar', 2, 4),
(9, 15, 'Boyacá', 3, 3),
(10, 17, 'Caldas', 5, 3),
(11, 18, 'Caquetá', 4, 2),
(12, 85, 'Casanare', 6, 5),
(13, 19, 'Cauca', 7, 6),
(14, 20, 'Cesar', 2, 4),
(15, 27, 'Chocó', 7, 6),
(16, 23, 'Córdoba', 2, 4),
(17, 25, 'Cundinamarca', 3, 3),
(18, 94, 'Guainía', 6, 2),
(19, 95, 'Guaviare', 6, 2),
(20, 41, 'Huila', 4, 3),
(21, 44, 'La Guajira', 2, 4),
(22, 47, 'Magdalena', 2, 4),
(23, 50, 'Meta', 6, 5),
(24, 52, 'Nariño', 7, 6),
(25, 54, 'Norte de Santander', 3, 3),
(26, 86, 'Putumayo', 4, 2),
(27, 63, 'Quindío', 5, 3),
(28, 66, 'Risaralda', 5, 3),
(29, 68, 'Santander', 3, 3),
(30, 70, 'Sucre', 2, 4),
(31, 73, 'Tolima', 4, 3),
(32, 76, 'Valle del Cauca', 7, 6),
(33, 97, 'Vaupés', 6, 2),
(34, 99, 'Vichada', 6, 5);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `departamentocol`
--
ALTER TABLE `departamentocol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departamentocol_ibfk_regioncol_dnp_id` (`dep_regdnp_id`),
  ADD KEY `departamentocol_ibfk_regioncol_nat_id` (`dep_regnat_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `departamentocol`
--
ALTER TABLE `departamentocol`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `departamentocol`
--
ALTER TABLE `departamentocol`
  ADD CONSTRAINT `departamentocol_ibfk_regioncol_dnp_id` FOREIGN KEY (`dep_regdnp_id`) REFERENCES `regioncol_dnp` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `departamentocol_ibfk_regioncol_nat_id` FOREIGN KEY (`dep_regnat_id`) REFERENCES `regioncol_nat` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
