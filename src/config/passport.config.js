import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';
import { PRIVATE_KEY } from './constants.js';

const initializePassport = () => {
passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
    }
    return done(null, user);
    } catch (err) {
    return done(err);
    }
}));

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PRIVATE_KEY
}, async (jwt_payload, done) => {
    try {
    const user = await User.findById(jwt_payload.id);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
    } catch (err) {
    return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
    const user = await User.findById(id);
    done(null, user);
    } catch (err) {
    done(err);
    }
});
};

export default initializePassport;