from crypt import methods
from flask import Flask, redirect, render_template, url_for, request
import vts

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/file-submit", methods=["POST", "GET"])
def file_submit():
    if request.method == "POST":
        file = request.form["file"]
        response = vts.main(file)
        return render_template("file-submit.html", response = response)
    else:    
        return render_template("file-submit.html")

@app.route("/creator")
def creator():
    return render_template("creator.html")


if __name__ == "__main__":
    app.run(debug=true)