-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Tempo de geração: 11-Jan-2024 às 23:30
-- Versão do servidor: 5.7.39
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `breakandbuild`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `materiais`
--

CREATE TABLE `materiais` (
  `id_player` int(11) NOT NULL,
  `objeto` varchar(50) NOT NULL,
  `PosX` int(100) NOT NULL,
  `PosY` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `materiais`
--

INSERT INTO `materiais` (`id_player`, `objeto`, `PosX`, `PosY`) VALUES
(1, 'Metal', 0, 0),
(2, 'Madeira', 0, 0),
(3, 'Água', 0, 0),
(4, 'Metal', 0, 0),
(5, 'Metal', 0, 0),
(6, 'Madeira', 0, 0),
(7, 'Madeira', 0, 0),
(8, 'Madeira', 0, 0),
(9, 'Madeira', 0, 0),
(10, 'Madeira', 0, 0),
(11, 'Madeira', 0, 0),
(12, 'Madeira', 0, 0),
(13, 'Madeira', 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `registo`
--

CREATE TABLE `registo` (
  `id_player` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pontos` int(255) NOT NULL,
  `dinheiro` int(255) NOT NULL,
  `id_mapa_atual` int(100) NOT NULL,
  `id_tanque_atual` int(100) NOT NULL,
  `id_inventario` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `registo`
--

INSERT INTO `registo` (`id_player`, `username`, `password`, `pontos`, `dinheiro`, `id_mapa_atual`, `id_tanque_atual`, `id_inventario`) VALUES
(1, 'alex', '123', 1000, 1000, 0, 0, 0),
(2, 'karina', '567', 0, 200, 0, 0, 0),
(3, 'Andreia', '159', 0, 0, 0, 0, 0),
(4, 'manel', '157', 0, 0, 0, 0, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `materiais`
--
ALTER TABLE `materiais`
  ADD PRIMARY KEY (`id_player`);

--
-- Índices para tabela `registo`
--
ALTER TABLE `registo`
  ADD PRIMARY KEY (`id_player`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `registo`
--
ALTER TABLE `registo`
  MODIFY `id_player` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
