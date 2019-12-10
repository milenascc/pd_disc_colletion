-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Dez-2019 às 02:42
-- Versão do servidor: 10.4.8-MariaDB
-- versão do PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `case_pd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `collections`
--

CREATE TABLE `collections` (
  `name` varchar(100) NOT NULL,
  `artistName` varchar(100) NOT NULL,
  `id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `collections`
--

INSERT INTO `collections` (`name`, `artistName`, `id`) VALUES
('rhreq', 'aweqwr', '4f9db1ad-7d97-427f-a2fd-07a48870f2b4'),
('Melhores de Pitty', 'Pitty', '7e910a50-a23b-406f-b75b-dfc6c069e348'),
('Melhores de Roberto Carlos', 'Roberto Carlos', 'd5791740-9647-439f-baff-97395cbed985');

-- --------------------------------------------------------

--
-- Estrutura da tabela `discs`
--

CREATE TABLE `discs` (
  `name` varchar(100) NOT NULL,
  `tracks` text NOT NULL,
  `fk_collection_Id` varchar(45) DEFAULT NULL,
  `img_url` text DEFAULT NULL,
  `info` text DEFAULT NULL,
  `id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `discs`
--

INSERT INTO `discs` (`name`, `tracks`, `fk_collection_Id`, `img_url`, `info`, `id`) VALUES
('Setevidas', 'Setevidas, Pouco, Deixa ela entrar, Pequena morte', '7e910a50-a23b-406f-b75b-dfc6c069e348', '', 'Ano: 2014, Gravadora: Deckdisc;Gênero: Rock alterninha', '001aa739-9faf-46af-862c-a621b379b519'),
('ee4wgg', 'seegahej,srtrjryj  drrgeh', '4f9db1ad-7d97-427f-a2fd-07a48870f2b4', '', 'fefefecc', '46e18a20-6a24-4d88-9d4d-f8e924a9f301'),
('Esse cara sou eu', 'Esse cara sou eu, Emoções', 'd5791740-9647-439f-baff-97395cbed985', '', 'múmia', '5f5a00f3-cf7c-4f39-ae33-b7e738f28634'),
('hystrix', 'etewtw', NULL, '', 'etew', '611c01de-d394-4071-b4f3-3292f26a36d3'),
('Admirável Chip Novo', 'Teto de Vidro, Admirável Chip Novo, Máscara, Equalize', '7e910a50-a23b-406f-b75b-dfc6c069e348', '', 'Ano: 2003, Gravadora: Deckdisc-Polysom;Produção: Rafael Ramos;Duração 39:31;Disco Diamante', '7f131b35-f7ea-49c6-82a7-f6575bdbe1d3');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `artistName` (`artistName`);

--
-- Índices para tabela `discs`
--
ALTER TABLE `discs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_collection` (`fk_collection_Id`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `discs`
--
ALTER TABLE `discs`
  ADD CONSTRAINT `fk_collection` FOREIGN KEY (`fk_collection_Id`) REFERENCES `collections` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
