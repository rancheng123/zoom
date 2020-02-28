
cd `dirname $0`
if [ -d "./demo/node_modules" ];then
cd ./demo
npm run-script postinstall-mac
#cp -Rf ../sdk/mac/ZoomSDK/ZoomSDK.framework/Versions/A/Headers/zoom_sdk_raw_data_helper_interface.h  ../lib/node_add_on/mac&&cp -Rf ../sdk/mac/ZoomSDK/ZoomSDK.framework/Versions/A/Headers/zoom_sdk_platform.h  ../lib/node_add_on/mac
else
cd ./demo
cnpm install
npm run-script postinstall-mac
fi

version=$(./node_modules/.bin/electron --version)


#echo 111111
#echo ${version#*v}
#exit

if [ $? -ne  0 ];then
echo "build fail ,electron not install"
exit
else
cd ../
sed -i "" 's/5.0.2/'${version#*v}'/g' ./demo/package.json

                           #要编译成的node版本       Download header tarball from custom URL
#node-gyp rebuild --target=${version#*v}          --dist-url=https://atom.io/download/electron
node-gyp rebuild --target=${version#*v}         --dist-url=https://npm.taobao.org/mirrors/atom-shell



fi
cp -Rf ./build/Release/zoomsdk.node              ./sdk/mac &&
cp -Rf ./build/Release/zoomsdk.node.dSYM         ./sdk/mac &&
cp -Rf ./build/Release/zoomsdk_render.node       ./sdk/mac &&
cp -Rf ./build/Release/zoomsdk_render.node.dSYM  ./sdk/mac


