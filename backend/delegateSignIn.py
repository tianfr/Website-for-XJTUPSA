# -- coding: utf-8 --
import xlwt
import xlrd
from xlutils.copy import copy
import json

# 我没仔细读题，自己遍历json字符串去找相关ID项的位置
delegateID = 'IDNumber'
volunteerID = 'StudentID'



def delegate_signIn(path, value):
    # 打开workbook，导入worksheet
    workbook = xlrd.open_workbook(path)
    sheets = workbook.sheet_names()
    worksheet = workbook.sheet_by_name(sheets[0])

    rows_old = worksheet.nrows
    print(rows_old)
    # 找idNumber在content中的位置
    for i in range(len(value['data']['content'])):
        if value['data']['content'][i]['id'] == delegateID:
            idMark = i
            break
    print(idMark)
    # 遍历表，若有重复提交，则把rows_old变为重复项所在的行号
    for i in range(rows_old):
        if worksheet.cell_value(i,idMark)==value['data']['content'][idMark]['value']:
            rows_old = i
            break
    print(rows_old)
    # 利用xlutils.copy建立xlwt和xlrd的桥梁
    new_workbook = copy(workbook)
    new_worksheet = new_workbook.get_sheet(0)
    # 在rows_old行写入新数据
    for i in range(0, len(value["data"]["content"])):
        new_worksheet.write(rows_old, i, value["data"]["content"][i]["value"])
    new_workbook.save(path)
    print("代表报名表【追加】写入数据成功！")


def volunteer_signIn(path, value):
    # 打开workbook，导入worksheet
    workbook = xlrd.open_workbook(path)
    sheets = workbook.sheet_names()
    worksheet = workbook.sheet_by_name(sheets[0])

    rows_old = worksheet.nrows
    print(rows_old)
    # 找idNumber在content中的位置
    for i in range(len(value['data']['content'])):
        if value['data']['content'][i]['id'] == volunteerID:
            idMark = i
            break
    print(idMark)
    # 遍历表，若有重复提交，则把rows_old变为重复项所在的行号
    for i in range(rows_old):
        if worksheet.cell_value(i,idMark)==value['data']['content'][idMark]['value']:
            rows_old = i
            break
    print(rows_old)
    # 利用xlutils.copy建立xlwt和xlrd的桥梁
    new_workbook = copy(workbook)
    new_worksheet = new_workbook.get_sheet(0)
    # 在rows_old行写入新数据
    for i in range(0, len(value["data"]["content"])):
        new_worksheet.write(rows_old, i, value["data"]["content"][i]["value"])
    new_workbook.save(path)
    print("志愿者报名表【追加】写入数据成功！")


def get_volunTime(path):
    a = 0
    b = 0
    c = 0
    d = 0
    e = 0
    workbook = xlrd.open_workbook(path)  # 打开工作簿
    sheets = workbook.sheet_names()  # 获取工作簿中的所有表格
    worksheet = workbook.sheet_by_name(sheets[0])  # 获取工作簿中所有表格中的的第一个表格
    for i in range(1, worksheet.nrows):
        if(worksheet.cell_value(i, 9) == "a"):
            a += 1
        elif (worksheet.cell_value(i, 9) == "b"):
            b += 1
        elif (worksheet.cell_value(i, 9) == "c"):
            c += 1
        elif (worksheet.cell_value(i, 9) == "d"):
            d += 1
        elif (worksheet.cell_value(i, 9) == "e"):
            e += 1
    Time_data = {
        "status": "0",
        "message": "volunteerGet",
        "data": {
            "title": {
                "id": "003",
                "name": "volunteerGet"
            },
            "content": {
                "time1": a,
                "time2": b,
                "time3": c,
                "time4": d

            }
        }
    }

    return Time_data
