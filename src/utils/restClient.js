import axios from 'axios';
import $ from 'jquery';
import qs from 'qs';
import Storage from './Storage';
import router from '../route/index';
import ErrorMsg from "../components/errorMsg/index";


export class RestClient {
  constructor(heads, error) {
    this.service = axios.create({
      timeout: 500000, // 请求超时时间
      withCredentials: true // 允许携带cookie
    })
    this.errorCallBack = function (e) {
      console.debug(e)
    }
    if (error) {
      this.errorCallback = error
    }
    this.errorMsg = ErrorMsg.install;
    this.headers = []
    if (heads) {
      this.headers = heads
    }
    this.service.interceptors.request.use(config => {
      for (const head of this.headers) {
        config.headers[head.name] = head.value
      }
      const tokenInfo = Storage.readTokenInfo();
      if (tokenInfo) {
        for (const index in tokenInfo) {
          config.headers[index] = tokenInfo[index]
        }
      }
      return config
    })

    this.service.interceptors.response.use(
      response => {
        const tokenInfo = Storage.readTokenInfo();
        if (tokenInfo) {
          const token = response.headers["token"];
          if (token) {
            tokenInfo.token = token;
            Storage.saveTokenInfo(tokenInfo);
          }
        }
        if (response.status !== 200) {
          this.errorCallback(response)
        }
        return response
      },
      error => {
        console.log('err' + error) // for debug
        if (error.response && error.response.data) {
          switch (error.response.status) {
            case 401:
              console.log("saveError", Storage.readError());
              Storage.clear();
              Storage.saveError(401);
              router.replace({
                path: "/login"
              });
              break;
            case 500:
              if (error.config.responseType === "arraybuffer") {
                let blob = new Blob([error.response.data]);
                var reader = new FileReader();
                reader.readAsText(blob, 'utf-8');
                reader.onload = () => {
                  const data = JSON.parse(reader.result);
                  this.errorMsg(data.code, data.msg, 'error');
                }
              } else {
                this.errorMsg(error.response.data.code, error.response.data.msg, 'error');
              }

          }
        }
        return error.response;
      })

    $.ajaxSetup({
      timeout: 500000,
      withCredentials: true,
      // 发送请求前触发
      beforeSend: function (xhr) {
        // 可以设置自定义标头
        const tokenInfo = Storage.readTokenInfo();
        for (const head in tokenInfo) {
          xhr.setRequestHeader(head, tokenInfo[head])
        }
      },
      error: function (xhr, status, e) {
        if (this.errorCallback) {
          this.errorCallback(xhr)
        }
      }
    })
  }

  sendAjax(url, holder) {
    if (!holder.type) {
      holder.type = 'post'
    }
    $.ajax({
      url: url,
      type: holder.type,
      async: !holder.async,
      data: holder.type == 'get' ? holder.data : JSON.stringify(holder.data),
      contentType: "application/json",
      success: function (data) {
        if (data.code === 200) {
          holder.success(data)
        } else {
          holder.fail(data)
        }
      }
    })
  }

  post2(url, holder, headers) {
    this.service.post(url, holder.data, headers).then(
      function (resp) {
        if (resp.status === 500) {
          return;
        }
        if (resp.data.code === 200) {
          holder.success(resp.data)
        } else {
          holder.fail(resp.data)
        }
      }
    )
  }

  post(url, holder) {
    holder.type = 'post'
    if (holder.async && holder.async === true) {
      this.sendAjax(url, holder)
    } else {
      this.service.post(url, holder.data).then(
        function (resp) {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        }
      )
    }
  }

  postForm(url, holder) {
    const formData = qs.stringify(holder.data)
    holder.type = 'post'
    if (holder.async && holder.async === true) {
      holder.data = formData
      this.sendAjax(url, holder)
    } else {
      this.service({
        url: url,
        method: 'post',
        data: formData
      }).then(
        resp => {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        })
    }
  }
  get(url, holder) {
    holder.type = 'get'
    if (holder.async && holder.async === true) {
      this.sendAjax(url, holder)
    } else {
      this.service.get(url).then(
        function (resp) {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        })
    }
  }
  exportByGet(url, holder) {
    holder.type = 'get'
    this.service.get(url, { responseType: 'arraybuffer' }).then(
      function (resp) {
        if (resp.status === 500) {
          return;
        }
        holder.redirect(resp)
      })

  }
  exportByPost(url, holder) {
    this.service.post(url, holder.data, { responseType: 'arraybuffer' }).then(
      function (resp) {
        if (resp.status === 200) {
          const _link = document.createElement("a");
          _link.download = decodeURI(resp.headers['content-disposition'].split('filename=')[1]);
          const blob = new Blob([resp.data]);
          _link.href = URL.createObjectURL(blob);
          document.body.appendChild(_link);
          _link.click();
          document.body.removeChild(_link);
          holder.success && holder.success();
        } else {
          holder.fail && holder.fail();
        }
      })
  }

  put(url, holder) {
    console.log("PUT->", url, holder);

    holder.type = 'put'
    if (holder.async && holder.async === true) {
      this.sendAjax(url, holder)
    } else {
      this.service.put(url, holder.data).then(
        function (resp) {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        })
    }
  }
  delete(url, holder) {
    holder.type = 'delete'
    if (holder.async && holder.async === true) {
      this.sendAjax(url, holder)
    } else {
      this.service.delete(url, holder.data).then(
        function (resp) {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        })
    }
  }
  patch(url, holder) {
    holder.type = 'patch'
    if (holder.async && holder.async === true) {
      this.sendAjax(url, holder)
    } else {
      this.service.patch(url, holder.data).then(
        resp => {
          if (resp.status === 500) {
            return;
          }
          if (resp.data.code === 200) {
            holder.success(resp.data)
          } else {
            holder.fail(resp.data)
          }
        })
    }
  }

  comet(url, method, holder) {
    var xhr = new XMLHttpRequest();
    let received = 0;	//最新消息在响应消息的位置
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 3) {
        const result = xhr.responseText.substring(received);
        received += result.length;
        holder.success(result);
      } else if (xhr.readyState == 4) {
        const result = xhr.responseText.substring(received);
        received += result.length;
        holder.success(result);
        holder.end();
      }
    }
    xhr.open(method, url);
    const tokenInfo = Storage.readTokenInfo();
    for (const head in tokenInfo) {
      xhr.setRequestHeader(head, tokenInfo[head]);
    }
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(holder.data));
  }

}

const restClient = new RestClient()

export default restClient