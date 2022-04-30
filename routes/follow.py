from bottle import post, delete, redirect, response
from utility.validation import get_jwt
import traceback
import db.database as db

@post('/follow/<user_to_follow>')
def _(user_to_follow):
    session = get_jwt()
    if session:
        try:
            db.follow_post(session['user_name'], user_to_follow)
            return
        except:
            traceback.print_exc()
            response.status = 500
            return
    else:
        return redirect('/login')

@delete('/follow/<user_to_follow>')
def _(user_to_follow):
    session = get_jwt()
    if session.get('user_name'):
        try:
            db.follow_delete(session['user_name'], user_to_follow)
            return
        except:
            traceback.print_exc()
            response.status = 500
            return
    else:
        return redirect('/login')