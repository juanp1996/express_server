class SessionsController {
  async session(req, res, next) {
    try {
      console.log("entro a ruta session");
      if (req.session.online) {
        console.log("respuesta 200");
        return res.message200("User is online");
      }
      console.log("respuesta 401");
      return res.error401();
    } catch (error) {
      return next(error);
    }
  }

  async register(req, res, next) {
    try {
      return res.message201("Registered");
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { signedCookie: true })
        .message200("Logged in!");
    } catch (error) {
      return next(error);
    }
  }

  async online(req, res, next) {
    try {
      if (req.user.online) {
        return res.response200(req.user);
      }
      const error = new Error("Bad auth");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }

  async destroySession(req, res, next) {
    try {
      console.log("Entro a destruir la sesion");
      res.clearCookie("token");
      console.log("Sesión destruida con éxito");
      return res.message200("Session closed successfully");
    } catch (error) {
      console.error(
        "Error en el controlador al querer destruir sesión:",
        error
      );
      return next(error);
    }
  }
}
const sessionController = new SessionsController();
const { session, register, login, online, destroySession } = sessionController;

export { session, register, login, online, destroySession };