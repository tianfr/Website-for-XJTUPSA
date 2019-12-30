# -- coding: utf-8 --
from flask import request, Flask, jsonify
import json
from flask_cors import *
from delegateSignIn import delegate_signIn
from delegateSignIn import volunteer_signIn
from delegateSignIn import get_volunTime
# 这两行很关键必须要有！

# 初始化Flask
app = Flask(__name__)
# 接受跨域请求
CORS(app, supports_credentials=True)


delegate_xls = 'delegates.xls'
volunteer_xls = 'volunteers.xls'


# settings.configure(DEBUG=True)

# app.config['JSON_AS_ASCII'] = False


@app.route('/delegate', methods=['POST','GET'])
def delegate():

    instance = request.json
    
    # 下面几行代码用于观察
    data = request.get_data()
    print("data type: {}".format(type(data)))
    # print(data)
    
    json_data = json.loads(data)
    print("json_data type: {}".format(type(json_data)))
    # print(json_data)

    try:
        
        delegate_signIn(delegate_xls,json_data)
        # 在这里写后端处理函数
        # insert_into_excel(json_data)

        return json.dumps({"successValue": "1"})
    except Exception as e:
        print(e)
        return json.dumps({"successValue": "0"})


@app.route('/volunteer', methods=['POST','GET'])
def volunteer():
    instance = request.json
    
    # 下面几行代码用于观察
    data = request.get_data()
    json_data = json.loads(data)

    try:
        volunteer_signIn(volunteer_xls,json_data)
        # 在这里写后端处理函数
        # json_data是字典类型
        # insert_into_excel(json_data)

        return json.dumps({"successValue": "1"})
    except Exception as e:
        print(e)
        return json.dumps({"successValue": "0"})

@app.route('/volunteerSend', methods=['POST','GET'])
def volunteerSend():
    print("recevie volunteerSend")
    try:
        print("successfully send")
        returnValue = json.dumps(get_volunTime(volunteer_xls))
        print(returnValue)
        print(type(returnValue))
        return json.dumps(get_volunTime(volunteer_xls))

    except Exception as e:
        print(e)
        


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=8888)