from flask import Flask, render_template, request
import vts

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/file-submit", methods=["POST", "GET"])
def file_submit():
    if request.method == "POST":
        print("dupa")
        file = request.form.get('dane')
        response = vts.main(file)
        return render_template("file-submit.html", response = response)
    else:    
        return render_template("file-submit.html")

@app.route("/creator")
def creator():
    return render_template("creator.html")


if __name__ == "__main__":
    app.run(debug=True)