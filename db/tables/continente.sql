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
-- Estrutura da tabela `continente`
--

CREATE TABLE `continente` (
  `id` int(2) NOT NULL,
  `con_nombre` varchar(20) NOT NULL,
  `con_nombre_alt` varchar(50) NOT NULL,
  `con_poblado` int(1) NOT NULL,
  `con_cont_id` int(2) NOT NULL COMMENT 'Continente pertenece'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `continente`
--

INSERT INTO `continente` (`id`, `con_nombre`, `con_nombre_alt`, `con_poblado`, `con_cont_id`) VALUES
(1, 'Sin definir', 'Sin definir', 0, 1),
(2, 'África', '', 1, 2),
(3, 'América', '', 1, 3),
(4, 'América Central', 'Centroamérica', 1, 3),
(5, 'América del Norte', 'Norteamérica ', 1, 3),
(6, 'América del Sur', 'Sudamérica', 1, 3),
(7, 'Antártida', '', 0, 7),
(8, 'Antillas', 'América Antillana;América Caribeña', 1, 3),
(9, 'Asia', '', 1, 9),
(10, 'Europa', '', 1, 10),
(11, 'Oceanía', '', 1, 11);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `continente`
--
ALTER TABLE `continente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `continente_ibfk_id` (`con_cont_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `continente`
--
ALTER TABLE `continente`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `continente`
--
ALTER TABLE `continente`
  ADD CONSTRAINT `continente_ibfk_id` FOREIGN KEY (`con_cont_id`) REFERENCES `continente` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
