/**
 * @type {import('easy-api.ts').EATS_ROUTE}
 */
const route = {
    url: '/profilecard',
    method: 'post',
    extraData: {
        description: 'Generates a profile card.',
        parameters: {
            username: {
                type: 'string',
                description: 'The name of the user.',
                optional: false
            },
            avatar: {
                type: 'string',
                description: 'The URL of the avatar.',
                optional: false
            },
            displayName: {
                type: 'string',
                description: 'The display name of the user.',
                optional: true
            },
            color: {
                type: 'string',
                description: 'The color of the profile card.',
                optional: true
            },
            banner: {
                type: 'string',
                description: 'The URL of the banner.',
                optional: true
            }
        }
    },
    code: `
        $c[Import the "SEND_CALLBACK".]
        $eval[false;$import[$join[$cwd;utils/callbacks.js];SEND_CALLBACK]]

        $c[Creating a badges map.]
        $createObject[badgeMap;{
            "active_developer": "$replace[$join[$cwd;assets;badges;activedeveloper.svg];\\\;/]",
            "automod": "$replace[$join[$cwd;assets;badges;automod.svg];\\\;/]",
            "nitro_bronze": "$replace[$join[$cwd;assets;badges;subscriptions;bronze.svg];\\\;/]"
        }]

        $c[Automating the process of validating each parameter.]
        $createObject[body;$getBody]
        $createObject[params;$routeData[/profilecard;parameters]]
        $createArray[pms;$objectKeys[params]]
        $arrayForEach[pms;
            $let[currentElement;%element%]
            $if[$and[$objectProperty[params;$get[currentElement].optional]==false;$objectIn[body;$get[currentElement]]==false]==true;
                $callback[send;400;json;{
                    "error": "true",
                    "message": "The query parameter '$get[currentElement]' is required."
                }]
                $stop
            ]
        ]

        $c[Creating the canvas.]
        $createCanvas[
            $c[600x280]
            $setDimensions[600;280]
            
            $c[Background color.]
            $color[282B30]
            $drawRect[0;0;600;280]

            $c[Loading and drawing the banner if any.]
            $loadImage[banner;link;$ternary[$objectIn[body;banner]==true;$objectProperty[body;banner];https://img.freepik.com/premium-photo/purple-mountain-wallpapers-that-will-make-your-desktop-look-purple-wallpaper-wallpaper-backgrounds_974629-18743.jpg]]
            $if[$isImage[banner]==false;
                $callback[send;400;json;{
                    "error": "true",
                    "message": "Invalid image URL provided for banner."
                }]
                $stop
            ]
            $drawImage[banner;15;15;570;150;40]

            $c[Loading, validating and drawing the user avatar.]
            $loadImage[avatar;link;$objectProperty[body;avatar]]
            $if[$isImage[avatar]==false;
                $callback[send;400;json;{
                    "error": "true",
                    "message": "Invalid image URL provided for avatar."
                }]
                $stop
            ]
            $drawImage[avatar;15;15;150;150;40]

            $c[Normalizing username and display name.]
            $let[display_name;$replaceRegex[$toFormalCase[$objectProperty[body;username]];[^a-zA-Z0-9];;g]]
            $let[username;@$replaceRegex[$toLowerCase[$objectProperty[body;username]];[^a-zA-Z];;g]]

            $c[Measuring fonts widths.]
            $font[20;Arial;bold]
            $createObject[displayNameMeasures;$measureText[$get[display_name];object]]
            $font[10;Arial]
            $createObject[usernameMeasures;$measureText[$get[username];object]]

            $c[Drawing the background for the display name and username.]
            $color[000000]
            $opacity[40]
            $drawRect[180;40;$trunc[$sum[$if[$objectProperty[displayNameMeasures;width]>$objectProperty[usernameMeasures;width];$objectProperty[displayNameMeasures;width];$objectProperty[usernameMeasures;width]];20]];$sum[$objectProperty[displayNameMeasures;height];$objectProperty[usernameMeasures;height];15];10]
            $opacity[100]
            $color[FFFFFF]

            $c[Drawing the display name.]
            $font[20;Arial;bold]
            $drawText[$get[display_name];190;42;200;100]

            $c[Drawing the username.]
            $font[10;Arial]
            $drawText[$get[username];190;67;100;100]

            $c[Drawing the badges.]
            $if[$objectIn[body;badges]==true;
                $let[limit;8]
                $let[acc;20]
                $let[i;0]
                $jsonArrayParse[badges;$objectProperty[body;badges]]
                $let[bgSize;$multi[10;$jsonArrayLength[badges]]]
                $jsonArrayForEach[badges;
                    $color[000000]
                    $opacity[40]
                    $drawRect[180;$sum[$objectProperty[displayNameMeasures;height];$objectProperty[usernameMeasures;height];57];$sum[$get[bgSize];35];20;5]
                    $opacity[100]
                    $if[$and[$get[i]<$get[limit];$objectIn[badgeMap;%element%]]==true;
                        $let[currentElement;%element%]
                        $let[limit;$sum[$get[limit];1]]
                        $loadImage[$get[currentElement];path;$objectProperty[badgeMap;$jsonArrayAt[badges;$get[i]]]]
                        $drawImage[$get[currentElement];$sum[170;$get[acc]];$sum[$objectProperty[displayNameMeasures;height];$objectProperty[usernameMeasures;height];60];15;15]
                        $let[acc;$sum[$get[acc];20]]
                        $let[i;$sum[$get[i];1]]
                    ]
                ]
            ]
        ]

        $c[Sending the response.]
        $callback[send;200;canvas;%default%]
    `
}

module.exports.route = route