import isInteger from 'lodash/isInteger'

// 获取导航菜单列表 / 权限
export function nav() {
  return {
    // isOpen: false,
    url: '/sys/menu/nav',
    type: 'get',
    data: {
      "msg": "success",
      "menuList": [ {
        "menuId": 92,
        "parentId": 0,
        "parentName": null,
        "name": "系统图表",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "支出列表",
        "orderNum": 1,
        "open": null,
        "list": [ {
          "menuId": 121,
          "parentId": 92,
          "parentName": null,
          "name": "对比曲线",
          "url": "power/comparison/comparisonChart",
          "perms": null,
          "type": 0,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": []
        }, {
          "menuId": 128,
          "parentId": 92,
          "parentName": null,
          "name": "系统环比同比",
          "url": "power/comparison/comparisonMutiChart",
          "perms": null,
          "type": 0,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": []
        },{
          "menuId": 129,
          "parentId": 92,
          "parentName": null,
          "name": "用气量图",
          "url": "power/comparison/airChart",
          "perms": null,
          "type": 0,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": []
        },{
          "menuId": 130,
          "parentId": 92,
          "parentName": null,
          "name": "系统累计气电比例图",
          "url": "power/comparison/eleAirChart",
          "perms": null,
          "type": 0,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": []
        },{
          "menuId": 131,
          "parentId": 92,
          "parentName": null,
          "name": "系统用电比例图",
          "url": "power/comparison/eleChart",
          "perms": null,
          "type": 0,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": []
        } ]
      }, {
        "menuId": 143,
        "parentId": 0,
        "parentName": null,
        "name": "报表站",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "项目列表",
        "orderNum": 0,
        "open": null,
        "list": [ {
          "menuId": 144,
          "parentId": 143,
          "parentName": null,
          "name": "累计流量报表",
          "url": "powerreport/runreport",
          "perms": null,
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 145,
          "parentId": 143,
          "parentName": null,
          "name": "能耗",
          "url": "powerreport/energyconsumereport",
          "perms": null,
          "type": 1,
          "icon": "tuichu",
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 146,
          "parentId": 143,
          "parentName": null,
          "name": "流量",
          "url": "powerreport/pipereport",
          "perms": null,
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 147,
          "parentId": 143,
          "parentName": null,
          "name": "故障报表",
          "url": "powerreport/alarmreport",
          "perms": null,
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 148,
          "parentId": 143,
          "parentName": null,
          "name": "排气温度",
          "url": "powerreport/outtempreport",
          "perms": null,
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 149,
          "parentId": 143,
          "parentName": null,
          "name": "气电比",
          "url": "powerreport/powerratereport",
          "perms": null,
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        } ]
      }, {
        "menuId": 1,
        "parentId": 0,
        "parentName": null,
        "name": "系统管理",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "system",
        "orderNum": 7,
        "open": null,
        "list": [ {
          "menuId": 2,
          "parentId": 1,
          "parentName": null,
          "name": "管理员列表",
          "url": "sys/user",
          "perms": null,
          "type": 1,
          "icon": "管理员",
          "orderNum": 1,
          "open": null,
          "list": null
        }, {
          "menuId": 3,
          "parentId": 1,
          "parentName": null,
          "name": "角色管理",
          "url": "sys/role",
          "perms": null,
          "type": 1,
          "icon": "role",
          "orderNum": 2,
          "open": null,
          "list": null
        }, {
          "menuId": 4,
          "parentId": 1,
          "parentName": null,
          "name": "菜单管理",
          "url": "sys/menu",
          "perms": null,
          "type": 1,
          "icon": "menu",
          "orderNum": 3,
          "open": null,
          "list": null
        }, {
          "menuId": 5,
          "parentId": 1,
          "parentName": null,
          "name": "SQL监控",
          "url": "http://localhost:8080/druid/sql.html",
          "perms": null,
          "type": 1,
          "icon": "sql",
          "orderNum": 4,
          "open": null,
          "list": null
        }, {
          "menuId": 6,
          "parentId": 1,
          "parentName": null,
          "name": "定时任务",
          "url": "job/schedule",
          "perms": null,
          "type": 1,
          "icon": "job",
          "orderNum": 5,
          "open": null,
          "list": null
        }, {
          "menuId": 27,
          "parentId": 1,
          "parentName": null,
          "name": "参数管理",
          "url": "sys/config",
          "perms": "sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete",
          "type": 1,
          "icon": "config",
          "orderNum": 6,
          "open": null,
          "list": null
        }, {
          "menuId": 30,
          "parentId": 1,
          "parentName": null,
          "name": "文件上传",
          "url": "oss/oss",
          "perms": "sys:oss:all",
          "type": 1,
          "icon": "oss",
          "orderNum": 6,
          "open": null,
          "list": null
        }, {
          "menuId": 29,
          "parentId": 1,
          "parentName": null,
          "name": "系统日志",
          "url": "sys/log",
          "perms": "sys:log:list",
          "type": 1,
          "icon": "log",
          "orderNum": 7,
          "open": null,
          "list": null
        } ]
      }, {
        "menuId": 118,
        "parentId": 0,
        "parentName": null,
        "name": "报表数据管理",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "项目列表",
        "orderNum": 4,
        "open": null,
        "list": [
          {
            "menuId": 126,
            "parentId": 118,
            "parentName": null,
            "name": "压力数据",
            "url": null,
            "perms": null,
            "type": 0,
            "icon": "密码",
            "orderNum": 0,
            "open": null,
            "list": [
              {
                "menuId": 131,
                "parentId": 126,
                "parentName": null,
                "name": "压力数据",
                "url": "power/daypress-data",
                "perms": "power:setting:list,power:setting:info",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
              }
            ]
          },
          {
            "menuId": 127,
            "parentId": 118,
            "parentName": null,
            "name": "流量数据",
            "url": null,
            "perms": null,
            "type": 0,
            "icon": "到账列表",
            "orderNum": 0,
            "open": null,
            "list": [
              {
                "menuId": 132,
                "parentId": 127,
                "parentName": null,
                "name": " 流量数据",
                "url": "power/pipe-data",
                "perms": "power:setting:list,power:setting:info",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
              }
            ]
          },
          {
            "menuId": 128,
            "parentId": 118,
            "parentName": null,
            "name": "耗电量数据",
            "url": null,
            "perms": null,
            "type": 0,
            "icon": "项目分类金额统计",
            "orderNum": 0,
            "open": null,
            "list": [
              {
                "menuId": 133,
                "parentId": 128,
                "parentName": null,
                "name": "电量数据",
                "url": "power/power-data",
                "perms": "power:setting:list,power:setting:info",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
              }
            ]
          },
          {
            "menuId": 129,
            "parentId": 118,
            "parentName": null,
            "name": "压力漏点数据",
            "url": null,
            "perms": null,
            "type": 0,
            "icon": "到账列表",
            "orderNum": 0,
            "open": null,
            "list": [
              {
                "menuId": 134,
                "parentId": 129,
                "parentName": null,
                "name": "压力漏点数据",
                "url": "power/presstemp-data",
                "perms": "power:setting:list,power:setting:info",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
              }
            ]
          },
          {
            "menuId": 130,
            "parentId": 118,
            "parentName": null,
            "name": "温度数据",
            "url": null,
            "perms": null,
            "type": 0,
            "icon": "项目列表",
            "orderNum": 0,
            "open": null,
            "list": [
              {
                "menuId": 135,
                "parentId": 130,
                "parentName": null,
                "name": "温度数据",
                "url": "power/temp-data",
                "perms": "power:setting:list,power:setting:info",
                "type": 1,
                "icon": null,
                "orderNum": 0,
                "open": null,
                "list": null
              }
            ]
          }
        ]
      }, {
        "menuId": 117,
        "parentId": 0,
        "parentName": null,
        "name": "提醒项管理",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "项目总计",
        "orderNum": 4,
        "open": null,
        "list": [ {
          "menuId": 120,
          "parentId": 117,
          "parentName": null,
          "name": "设备能耗",
          "url": "power/energy",
          "perms": "power:setting:list,power:setting:info",
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 98,
          "parentId": 94,
          "parentName": null,
          "name": "提醒项",
          "url": "power/alarm",
          "perms": "power:setting:list,power:setting:info",
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        } ]
      }, {
        "menuId": 82,
        "parentId": 0,
        "parentName": null,
        "name": "参数设定",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "system",
        "orderNum": 4,
        "open": null,
        "list": [ {
          "menuId": 188,
          "parentId": 82,
          "parentName": null,
          "name": "设备管理",
          "url": "power/equip",
          "perms": "power:setting:list,power:setting:info",
          "type": 1,
          "icon": null,
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 141,
          "parentId": 137,
          "parentName": null,
          "name": "电费管理",
          "url": "power/powercost",
          "perms": "power:setting:list,power:setting:info",
          "type": 1,
          "icon": "协议金额统计",
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 84,
          "parentId": 82,
          "parentName": null,
          "name": "修正參數管理",
          "url": null,
          "perms": null,
          "type": 0,
          "icon": "",
          "orderNum": 3,
          "open": null,
          "list": [ {
            "menuId": 83,
            "parentId": 82,
            "parentName": null,
            "name": "设备参数设定",
            "url": "power/setting",
            "perms": "power:setting:list,power:setting:info",
            "type": 1,
            "icon": "",
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 85,
            "parentId": 84,
            "parentName": null,
            "name": "管路压力",
            "url": "power/press",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 86,
            "parentId": 84,
            "parentName": null,
            "name": "母管流量",
            "url": "power/pipe",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 87,
            "parentId": 84,
            "parentName": null,
            "name": "运行电流",
            "url": "power/stream",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 88,
            "parentId": 84,
            "parentName": null,
            "name": "运行电压",
            "url": "power/voltage",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 89,
            "parentId": 84,
            "parentName": null,
            "name": "温度设定",
            "url": "power/temperature",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 90,
            "parentId": 84,
            "parentName": null,
            "name": "压力漏点",
            "url": "power/dewpoint",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          }, {
            "menuId": 136,
            "parentId": 84,
            "parentName": null,
            "name": "设备采集参数设定",
            "url": "power/equiment-param",
            "perms": "collect:paramcollect:save,collect:paramcollect:list,collect:paramcollect:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          } ]
        }, {
          "menuId": 93,
          "parentId": 82,
          "parentName": null,
          "name": "应用公式",
          "url": "power/formular",
          "perms": null,
          "type": 0,
          "icon": "协议金额统计",
          "orderNum": 5,
          "open": null,
          "list": [ {
            "menuId": 95,
            "parentId": 93,
            "parentName": null,
            "name": "设备功率公式",
            "url": "power/formular",
            "perms": "power:formular:list,power:formular:info",
            "type": 1,
            "icon": null,
            "orderNum": 0,
            "open": null,
            "list": null
          } ]
        } ]
      }, {
        "menuId": 38,
        "parentId": 0,
        "parentName": null,
        "name": "用户管理",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "用户管理",
        "orderNum": 6,
        "open": null,
        "list": [ {
          "menuId": 48,
          "parentId": 38,
          "parentName": null,
          "name": "管理员",
          "url": "/sys/user",
          "perms": "sys:user:list,sys:user:info",
          "type": 1,
          "icon": "xiangqufill",
          "orderNum": 0,
          "open": null,
          "list": null
        } ]
      }, {
        "menuId": 39,
        "parentId": 0,
        "parentName": null,
        "name": "个人资料",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "个人资料",
        "orderNum": 6,
        "open": null,
        "list": [ {
          "menuId": 49,
          "parentId": 39,
          "parentName": null,
          "name": "基本信息",
          "url": "/sys/user-profile",
          "perms": "sys:user:info,sys:user:save,sys:user:update",
          "type": 1,
          "icon": "tixing",
          "orderNum": 0,
          "open": null,
          "list": null
        }, {
          "menuId": 50,
          "parentId": 39,
          "parentName": null,
          "name": "修改密码",
          "url": "sys/user-password",
          "perms": "sys:user:update",
          "type": 1,
          "icon": "zonghe",
          "orderNum": 1,
          "open": null,
          "list": null
        } ]
      } ],
      "code": 0,
      "permissions": [ "sys:schedule:info", "sys:menu:update", "sys:menu:delete", "sys:config:info", "collect:paramcollect:list", "sys:user:password", "sys:menu:list", "sys:config:save", "sys:config:update", "power:setting:list", "sys:schedule:resume", "sys:user:delete", "sys:config:list", "collect:paramcollect:info", "sys:user:update", "sys:role:list", "sys:menu:info", "sys:menu:select", "sys:schedule:update", "sys:schedule:save", "sys:role:select", "power:formular:list", "power:setting:info", "sys:user:list", "sys:menu:save", "sys:role:save", "sys:schedule:log", "sys:role:info", "sys:schedule:delete", "sys:role:update", "power:formular:info", "sys:schedule:list", "sys:user:info", "sys:schedule:run", "sys:config:delete", "sys:role:delete", "sys:user:save", "collect:paramcollect:save", "sys:schedule:pause", "sys:log:list", "sys:oss:all" ]
    }
  }
}

// 获取菜单列表
export function list() {
  return {
    isOpen: false,
    url: '/sys/menu/list',
    type: 'get',
    data: [ {
      'menuId': 1,
      'parentId': 0,
      'parentName': null,
      'name': '系统管理',
      'url': null,
      'perms': null,
      'type': 0,
      'icon': 'fa fa-cog',
      'orderNum': 0,
      'open': null,
      'list': null
    },
      {
        'menuId': 2,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '管理员列表',
        'url': 'modules/sys/user.html',
        'perms': null,
        'type': 1,
        'icon': 'fa fa-user',
        'orderNum': 1,
        'open': null,
        'list': null
      },
      {
        'menuId': 3,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '角色管理',
        'url': 'modules/sys/role.html',
        'perms': null,
        'type': 1,
        'icon': 'fa fa-user-secret',
        'orderNum': 2,
        'open': null,
        'list': null
      },
      {
        'menuId': 4,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '菜单管理',
        'url': 'modules/sys/menu.html',
        'perms': null,
        'type': 1,
        'icon': 'fa fa-th-list',
        'orderNum': 3,
        'open': null,
        'list': null
      },
      {
        'menuId': 5,
        'parentId': 1,
        'parentName': '系统管理',
        'name': 'SQL监控',
        'url': 'druid/sql.html',
        'perms': null,
        'type': 1,
        'icon': 'fa fa-bug',
        'orderNum': 4,
        'open': null,
        'list': null
      },
      {
        'menuId': 6,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '定时任务',
        'url': 'modules/job/schedule.html',
        'perms': null,
        'type': 1,
        'icon': 'fa fa-tasks',
        'orderNum': 5,
        'open': null,
        'list': null
      },
      {
        'menuId': 7,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '查看',
        'url': null,
        'perms': 'sys:schedule:list,sys:schedule:info',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 8,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '新增',
        'url': null,
        'perms': 'sys:schedule:save',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 9,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '修改',
        'url': null,
        'perms': 'sys:schedule:update',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 10,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '删除',
        'url': null,
        'perms': 'sys:schedule:delete',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 11,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '暂停',
        'url': null,
        'perms': 'sys:schedule:pause',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 12,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '恢复',
        'url': null,
        'perms': 'sys:schedule:resume',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 13,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '立即执行',
        'url': null,
        'perms': 'sys:schedule:run',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 14,
        'parentId': 6,
        'parentName': '定时任务',
        'name': '日志列表',
        'url': null,
        'perms': 'sys:schedule:log',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 15,
        'parentId': 2,
        'parentName': '管理员列表',
        'name': '查看',
        'url': null,
        'perms': 'sys:user:list,sys:user:info',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 16,
        'parentId': 2,
        'parentName': '管理员列表',
        'name': '新增',
        'url': null,
        'perms': 'sys:user:save,sys:role:select',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 17,
        'parentId': 2,
        'parentName': '管理员列表',
        'name': '修改',
        'url': null,
        'perms': 'sys:user:update,sys:role:select',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 18,
        'parentId': 2,
        'parentName': '管理员列表',
        'name': '删除',
        'url': null,
        'perms': 'sys:user:delete',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 19,
        'parentId': 3,
        'parentName': '角色管理',
        'name': '查看',
        'url': null,
        'perms': 'sys:role:list,sys:role:info',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 20,
        'parentId': 3,
        'parentName': '角色管理',
        'name': '新增',
        'url': null,
        'perms': 'sys:role:save,sys:menu:list',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 21,
        'parentId': 3,
        'parentName': '角色管理',
        'name': '修改',
        'url': null,
        'perms': 'sys:role:update,sys:menu:list',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 22,
        'parentId': 3,
        'parentName': '角色管理',
        'name': '删除',
        'url': null,
        'perms': 'sys:role:delete',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 23,
        'parentId': 4,
        'parentName': '菜单管理',
        'name': '查看',
        'url': null,
        'perms': 'sys:menu:list,sys:menu:info',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 24,
        'parentId': 4,
        'parentName': '菜单管理',
        'name': '新增',
        'url': null,
        'perms': 'sys:menu:save,sys:menu:select',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 25,
        'parentId': 4,
        'parentName': '菜单管理',
        'name': '修改',
        'url': null,
        'perms': 'sys:menu:update,sys:menu:select',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 26,
        'parentId': 4,
        'parentName': '菜单管理',
        'name': '删除',
        'url': null,
        'perms': 'sys:menu:delete',
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 27,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '参数管理',
        'url': 'modules/sys/config.html',
        'perms': 'sys:config:list,sys:config:info,sys:config:save,sys:config:update,sys:config:delete',
        'type': 1,
        'icon': 'fa fa-sun-o',
        'orderNum': 6,
        'open': null,
        'list': null
      },
      {
        'menuId': 29,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '系统日志',
        'url': 'modules/sys/log.html',
        'perms': 'sys:log:list',
        'type': 1,
        'icon': 'fa fa-file-text-o',
        'orderNum': 7,
        'open': null,
        'list': null
      },
      {
        'menuId': 30,
        'parentId': 1,
        'parentName': '系统管理',
        'name': '文件上传',
        'url': 'modules/oss/oss.html',
        'perms': 'sys:oss:all',
        'type': 1,
        'icon': 'fa fa-file-image-o',
        'orderNum': 6,
        'open': null,
        'list': null
      },
      {
        'menuId': 31,
        'parentId': 0,
        'parentName': null,
        'name': 'test',
        'url': null,
        'perms': null,
        'type': 0,
        'icon': null,
        'orderNum': 5,
        'open': null,
        'list': null
      },
      {
        'menuId': 46,
        'parentId': 2,
        'parentName': '管理员列表',
        'name': 'test',
        'url': null,
        'perms': null,
        'type': 2,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      },
      {
        'menuId': 47,
        'parentId': 1,
        'parentName': '系统管理',
        'name': 'test2',
        'url': '/test/test2.html',
        'perms': null,
        'type': 1,
        'icon': null,
        'orderNum': 0,
        'open': null,
        'list': null
      } ]
  }
}

// 获取上级菜单
export function select() {
  return {
    isOpen: false,
    url: '/sys/menu/select',
    type: 'get',
    data: {}
  }
}

// 获取菜单信息
export function info(id) {
  return {
    isOpen: false,
    url: '/sys/menu/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {}
  }
}

// 添加菜单
export function add(params) {
  return {
    isOpen: false,
    url: '/sys/menu/save',
    type: 'post',
    data: {}
  }
}

// 修改菜单
export function update(params) {
  return {
    isOpen: false,
    url: '/sys/menu/update',
    type: 'post',
    data: {}
  }
}

// 删除菜单
export function del(id) {
  return {
    isOpen: false,
    url: '/sys/menu/delete' + (isInteger(id) ? `/${id}` : ''),
    type: 'post',
    data: {}
  }
}
