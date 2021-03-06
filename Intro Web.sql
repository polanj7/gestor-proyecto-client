USE [master]
GO
/****** Object:  Database [GestorAyudaWEB]    Script Date: 2/27/2022 7:20:51 PM ******/
CREATE DATABASE [GestorAyudaWEB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GestorAyudaWEB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.GALILEOSERVER\MSSQL\DATA\GestorAyudaWEB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GestorAyudaWEB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.GALILEOSERVER\MSSQL\DATA\GestorAyudaWEB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GestorAyudaWEB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GestorAyudaWEB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GestorAyudaWEB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET ARITHABORT OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GestorAyudaWEB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GestorAyudaWEB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [GestorAyudaWEB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GestorAyudaWEB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET RECOVERY FULL 
GO
ALTER DATABASE [GestorAyudaWEB] SET  MULTI_USER 
GO
ALTER DATABASE [GestorAyudaWEB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GestorAyudaWEB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GestorAyudaWEB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GestorAyudaWEB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GestorAyudaWEB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GestorAyudaWEB', N'ON'
GO
ALTER DATABASE [GestorAyudaWEB] SET QUERY_STORE = OFF
GO
USE [GestorAyudaWEB]
GO
/****** Object:  Schema [Consulta]    Script Date: 2/27/2022 7:20:52 PM ******/
CREATE SCHEMA [Consulta]
GO
/****** Object:  Schema [Maestra]    Script Date: 2/27/2022 7:20:52 PM ******/
CREATE SCHEMA [Maestra]
GO
/****** Object:  Schema [Operacion]    Script Date: 2/27/2022 7:20:52 PM ******/
CREATE SCHEMA [Operacion]
GO
/****** Object:  Table [Maestra].[Elementos]    Script Date: 2/27/2022 7:20:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Maestra].[Elementos](
	[ElementoID] [varchar](30) NOT NULL,
	[IntroID] [int] NOT NULL,
	[Titulo] [varchar](100) NOT NULL,
	[Mensaje] [varchar](max) NULL,
	[Link] [varchar](max) NULL,
	[Orden] [int] NOT NULL,
	[Estado] [bit] NULL,
	[FechaCreacion] [datetime] NULL,
	[UsuarioCreo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ElementoID] ASC,
	[IntroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Maestra].[Intro]    Script Date: 2/27/2022 7:20:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Maestra].[Intro](
	[IntroID] [int] IDENTITY(1,1) NOT NULL,
	[VistaID] [varchar](30) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Estado] [bit] NULL,
	[FechaCreacion] [datetime] NULL,
	[UsuarioCreo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IntroID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Maestra].[Modulos]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Maestra].[Modulos](
	[APP] [int] NOT NULL,
	[ModuloID] [varchar](30) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Estado] [bit] NULL,
	[FechaCreacion] [datetime] NULL,
	[UsuarioCreo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[APP] ASC,
	[ModuloID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Maestra].[UsuarioIntro]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Maestra].[UsuarioIntro](
	[Usuario] [int] NOT NULL,
	[IntroID] [int] NOT NULL,
	[Fecha] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Maestra].[Vistas]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Maestra].[Vistas](
	[VistaID] [varchar](30) NOT NULL,
	[ModuloID] [varchar](30) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Estado] [bit] NULL,
	[FechaCreacion] [datetime] NULL,
	[UsuarioCreo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[VistaID] ASC,
	[ModuloID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Maestra].[Elementos] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [Maestra].[Elementos] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [Maestra].[Intro] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [Maestra].[Intro] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [Maestra].[Modulos] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [Maestra].[Modulos] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [Maestra].[UsuarioIntro] ADD  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [Maestra].[Vistas] ADD  DEFAULT ((1)) FOR [Estado]
GO
ALTER TABLE [Maestra].[Vistas] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
/****** Object:  StoredProcedure [Consulta].[usp_getElementosByIntro]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create proc [Consulta].[usp_getElementosByIntro]

@IntroID int

as

begin

	SELECT * FROM Maestra.Elementos
	WHERE IntroID = @IntroID

end
GO
/****** Object:  StoredProcedure [Consulta].[usp_getIntroByVista]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create proc [Consulta].[usp_getIntroByVista]

@VistaID varchar(30)

as

begin

	SELECT * FROM Maestra.Intro
	WHERE VistaID = @VistaID

end
GO
/****** Object:  StoredProcedure [Consulta].[usp_getModulos]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create proc [Consulta].[usp_getModulos]

as

begin

	SELECT * FROM Maestra.Modulos


end
GO
/****** Object:  StoredProcedure [Consulta].[usp_getVistasByModulo]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


create proc [Consulta].[usp_getVistasByModulo]

@ModuloID varchar(30)

as

begin

	SELECT * FROM Maestra.Vistas
	WHERE ModuloID = @ModuloID

end
GO
/****** Object:  StoredProcedure [Operacion].[usp_insertElementos]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [Operacion].[usp_insertElementos]

@ElementoID VARCHAR(30),
@IntroID INT,
@Titulo VARCHAR(100),
@Mensaje VARCHAR(MAX),
@Link VARCHAR(MAX),
@Orden INT,
@Estado BIT,
@Usuario INT,
@Operacion CHAR(1) /*I, U, D*/

AS

BEGIN

	IF @Operacion = 'I'
	BEGIN
		INSERT INTO Maestra.Elementos(ElementoID, IntroID, Titulo, Mensaje, Link, Orden, UsuarioCreo)
		VALUES(@ElementoID, @IntroID, @Titulo, @Mensaje, @Link, @Orden, @Usuario)
	END
	ELSE IF @Operacion = 'U'
	BEGIN
		UPDATE Maestra.Elementos
		SET ElementoID = @ElementoID,
			Titulo = @Titulo,
			Mensaje = @Mensaje,
			Link = @Link,
			Orden = @Orden
		WHERE @IntroID = @IntroID AND ElementoID = @ElementoID
	END
	ELSE IF @Operacion = 'D'
	BEGIN
		UPDATE Maestra.Elementos
		SET Estado = @Estado		
		WHERE @IntroID = @IntroID AND ElementoID = @ElementoID
	END
	
END
GO
/****** Object:  StoredProcedure [Operacion].[usp_insertIntro]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [Operacion].[usp_insertIntro]

@IntroID INT,
@VistaID VARCHAR(30),
@Descripcion VARCHAR(50),
@Estado BIT,
@Usuario INT,
@Operacion CHAR(1) /*I, U, D*/

AS

BEGIN

	IF @Operacion = 'I'
	BEGIN
		INSERT INTO Maestra.Intro(VistaID, Descripcion, UsuarioCreo)
		VALUES(@VistaID, @Descripcion, @Usuario)
	END
	ELSE IF @Operacion = 'U'
	BEGIN
		UPDATE Maestra.Intro
		SET Descripcion = @Descripcion
		WHERE @IntroID = @IntroID
	END
	ELSE IF @Operacion = 'D'
	BEGIN
		UPDATE Maestra.Intro
		SET Estado = @Estado		
		WHERE IntroID = @IntroID
	END
	
END
GO
/****** Object:  StoredProcedure [Operacion].[usp_insertModulos]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [Operacion].[usp_insertModulos]

@App INT,
@ModuloID VARCHAR(30),
@Descripcion VARCHAR(50),
@Estado BIT,
@Usuario INT,
@Operacion CHAR(1) /*I, U, D*/

AS


BEGIN

	IF @Operacion = 'I'
	BEGIN
		INSERT INTO Maestra.Modulos(APP, ModuloID, Descripcion, UsuarioCreo)
		VALUES(@App, @ModuloID, @Descripcion, @Usuario)
	END
	ELSE IF @Operacion = 'U'
	BEGIN
		UPDATE Maestra.Modulos
		SET ModuloID = @ModuloID,
			Descripcion = @Descripcion
		WHERE ModuloID = @ModuloID AND APP = @App
	END
	ELSE IF @Operacion = 'D'
	BEGIN
		UPDATE Maestra.Modulos
		SET Estado = @Estado		
		WHERE ModuloID = @ModuloID AND APP = @App
	END
	
END
GO
/****** Object:  StoredProcedure [Operacion].[usp_insertUsuarioIntro]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [Operacion].[usp_insertUsuarioIntro]

@Usuario INT,
@IntroID INT

AS

BEGIN

	INSERT INTO Maestra.UsuarioIntro(Usuario, IntroID)
	VALUES(@Usuario, @IntroID)	
	
END
GO
/****** Object:  StoredProcedure [Operacion].[usp_insertVistas]    Script Date: 2/27/2022 7:20:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [Operacion].[usp_insertVistas]

@VistaID VARCHAR(30),
@ModuloID VARCHAR(30),
@Descripcion VARCHAR(50),
@Estado BIT,
@Usuario INT,
@Operacion CHAR(1) /*I, U, D*/

AS


BEGIN

	IF @Operacion = 'I'
	BEGIN
		INSERT INTO Maestra.Vistas(VistaID, ModuloID, Descripcion, UsuarioCreo)
		VALUES(@VistaID, @ModuloID, @Descripcion, @Usuario)
	END
	ELSE IF @Operacion = 'U'
	BEGIN
		UPDATE Maestra.Vistas
		SET VistaID = @VistaID,
			Descripcion = @Descripcion
		WHERE ModuloID = @ModuloID AND VistaID = @VistaID
	END
	ELSE IF @Operacion = 'D'
	BEGIN
		UPDATE Maestra.Vistas
		SET Estado = @Estado		
		WHERE ModuloID = @ModuloID AND VistaID = @VistaID
	END
	
END
GO
USE [master]
GO
ALTER DATABASE [GestorAyudaWEB] SET  READ_WRITE 
GO
