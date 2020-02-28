
//本地 运行
1. 安装electron
2. 将sdk 部分东西 植入 electron 包内

    sdk/mac/Plugins    ./node_modules/electron/dist/Electron.app/Contents/
    sdk/mac/Resources  ./node_modules/electron/dist/Electron.app/Contents/
    sdk/mac/ZoomSDK/   ./node_modules/electron/dist/Electron.app/Contents/Frameworks


3. 构建C++ 模块
    node-gyp rebuild --target=${version#*v}         --dist-url=https://npm.taobao.org/mirrors/atom-shell

4. 将构建出来的 元素模块 植入sdk/mac

    cp -Rf ./build/Release/zoomsdk.node              ./sdk/mac &&
    cp -Rf ./build/Release/zoomsdk.node.dSYM         ./sdk/mac &&
    cp -Rf ./build/Release/zoomsdk_render.node       ./sdk/mac &&
    cp -Rf ./build/Release/zoomsdk_render.node.dSYM  ./sdk/mac



//打包
5. 打包
#electron-packager  生成app目录                                                                        就是demo目录
                                    ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/Resources/(app)

# 将lib里的js 植入                                                                                     里面有js文件
yes|cp -R  -H ../lib                ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/Resources/(lib)

# 将生成的C++ 模块 植入                                                                                 里面有C++模块
yes|cp -R  -H ../sdk                ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/Resources/(sdk)



yes|cp -R  -H ../sdk/mac/Plugins    ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/(Plugins)
yes|cp -R  -H ../sdk/mac/Resources  ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/(Resources...)
yes|cp -R  -H ../sdk/mac/ZoomSDK/*  ./OutApp/zoomsdkapp-darwin-x64/zoomsdkapp.app/Contents/Frameworks/(ZoomSDK...)