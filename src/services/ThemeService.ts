import { Inject, Injectable } from "@tsed/di";
import { UserThemesRepository } from '../prisma/repositories/UserThemesRepository';

@Injectable()
export class ThemeService {
    @Inject() private themeRepository: UserThemesRepository;

    async createTheme(inputData: any) {
        // console.log('inputData =====', inputData);
        const nameExists = await this.themeRepository.findFirst({ where: { themeName: inputData.themeName } });
        if (nameExists) {
            throw new Error('CUSTOM: Theme name already exists');
        }
        return this.themeRepository.create({
            data: {
                ...inputData,
            }
        });
    };

    async getThemes() {
        return this.themeRepository.findMany();
    }

    async getTheme(id: number) {
        return this.themeRepository.findFirst({ where: { id } });
    }

    async getThemeByUserId(userId: number) {
        return this.themeRepository.findFirst({ where: { userId } });
    }

    async getThemeByUserSessionId(userSessionId: string) {
        return this.themeRepository.findFirst({ where: { userSessionId } });
    }

    async updateTheme(id: number, inputData: any) {
        const nameExists = await this.themeRepository.findFirst({ where: { themeName: inputData.themeName } });
        if (nameExists && nameExists.id !== id) {
            throw new Error('CUSTOM: Theme name already exists');
        }
        return this.themeRepository.update({
            where: { id },
            data: {
                ...inputData,
            }
        });
    }

    async deleteTheme(id: number) {
        return this.themeRepository.delete({ where: { id } });
    }

    async makeOneActive(id: number) {
        // console.log('id =====', id);
        return this.themeRepository.updateMany({
            data: {
                isActive: false,
                status: 'pending'
            }
        }).then(() => {
            return this.themeRepository.update({
                where: { id },
                data: {
                    isActive: true,
                    status: 'active'
                }
            });
        });
    }

    async getActiveTheme() {
        return this.themeRepository.findFirst({ where: { status: 'active' } });
    }

    async getActiveScreen(ua: string) {
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tab";
        }
        if (
            /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
                ua
            )
        ) {
            return "mobile";
        }
        return "desktop";
    };

    getActiveThemeCss(themeObj: any, activeScreen: string) {
        console.log('themeObj 1  =====', themeObj);
        if (!themeObj) {
            themeObj = {
                "avtr": {
                    "desktop": {
                        "heightValueMeta": 45, "widthValueMeta": 45, "topBorderRadiusMeta": 50, "rightBorderRadiusMeta": 50, "bottomBorderRadiusMeta": 50, "leftBorderRadiusMeta": 50, "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "logoImage": "https://backend.chatbase.co/storage/v1/object/public/chatbots-profile-pictures/bbbf6618-8c2c-41e3-a82f-70ce2bc03a8d/pbJ_qZvKAOryGVvLunxXZ.jpeg?width=48&quality=50"
                    },
                    "tab": {
                        "heightValueMeta": 45, "widthValueMeta": 45, "topBorderRadiusMeta": 50, "rightBorderRadiusMeta": 50, "bottomBorderRadiusMeta": 50, "leftBorderRadiusMeta": 50, "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "logoImage": "https://backend.chatbase.co/storage/v1/object/public/chatbots-profile-pictures/bbbf6618-8c2c-41e3-a82f-70ce2bc03a8d/pbJ_qZvKAOryGVvLunxXZ.jpeg?width=48&quality=50"
                    },
                    "mobile": {
                        "heightValueMeta": 45, "widthValueMeta": 45, "topBorderRadiusMeta": 50, "rightBorderRadiusMeta": 50, "bottomBorderRadiusMeta": 50, "leftBorderRadiusMeta": 50, "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "logoImage": "https://backend.chatbase.co/storage/v1/object/public/chatbots-profile-pictures/bbbf6618-8c2c-41e3-a82f-70ce2bc03a8d/pbJ_qZvKAOryGVvLunxXZ.jpeg?width=48&quality=50"
                    }
                },
                "Messenger_prompt": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 16, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 16, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 16, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    }
                },
                "msg": {
                    "desktop": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#dee2e6", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 10, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 0
                    },
                    "tab": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#dee2e6", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 10, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 0
                    },
                    "mobile": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#dee2e6", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 10, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 0
                    }
                },
                "msg-user": {
                    "desktop": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "rightMarginMeta": 0, "bottomMarginMeta": 0, "bgColorChangeMeta": "#004cf8", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 0, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 10
                    },
                    "tab": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "rightMarginMeta": 0, "bottomMarginMeta": 0, "bgColorChangeMeta": "#004cf8", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 0, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 10
                    },
                    "mobile": {
                        "topPaddingMeta": 10, "rightPaddingMeta": 15, "bottomPaddingMeta": 25, "leftPaddingMeta": 15, "topMarginMeta": 15, "rightMarginMeta": 0, "bottomMarginMeta": 0, "bgColorChangeMeta": "#004cf8", "topBorderRadiusMeta": 10, "rightBorderRadiusMeta": 0, "bottomBorderRadiusMeta": 10, "leftBorderRadiusMeta": 10
                    }
                },
                "responsText": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    }
                },
                "responsText-user": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    }
                },
                "Messenger_content": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "mainImage": "", "bgColorChangeMeta": "#000000", "mainVideo": "", "mainAudio": ""
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "mainImage": "", "bgColorChangeMeta": "#000000", "mainVideo": "", "mainAudio": ""
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "mainImage": "", "bgColorChangeMeta": "#000000", "mainVideo": "", "mainAudio": ""
                    }
                },
                "mytext": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 40, "bottomPaddingMeta": 0, "leftPaddingMeta": 20, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 40, "bottomPaddingMeta": 0, "leftPaddingMeta": 20, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 40, "bottomPaddingMeta": 0, "leftPaddingMeta": 20, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    }
                },
                "mytext-bg": {
                    "desktop": {
                        "topPaddingMeta": 17, "rightPaddingMeta": 0, "bottomPaddingMeta": 15, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#1d2731"
                    },
                    "tab": {
                        "topPaddingMeta": 17, "rightPaddingMeta": 0, "bottomPaddingMeta": 15, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#1d2731"
                    },
                    "mobile": {
                        "topPaddingMeta": 17, "rightPaddingMeta": 0, "bottomPaddingMeta": 15, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "bgColorChangeMeta": "#1d2731"
                    }
                },
                "Messenger_header": {
                    "desktop": {
                        "bgColorChangeMeta": "#1d2731"
                    },
                    "tab": {
                        "bgColorChangeMeta": "#1d2731"
                    },
                    "mobile": {
                        "bgColorChangeMeta": "#1d2731"
                    }
                },
                "time": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#000000"
                    }
                },
                "time-user": {
                    "desktop": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "tab": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    },
                    "mobile": {
                        "topPaddingMeta": 0, "rightPaddingMeta": 0, "bottomPaddingMeta": 0, "leftPaddingMeta": 0, "topMarginMeta": 0, "rightMarginMeta": 0, "bottomMarginMeta": 0, "leftMarginMeta": 0, "fontSizeMeta": 13, "fontWeightMeta": 400, "fontFamilyMeta": "'Poppins', sans-serif", "colorChangeMeta": "#ffffff"
                    }
                },
            }
        }
        console.log('themeObj 2 =====', themeObj);
        const avtr = themeObj["avtr"][activeScreen];
        const messenger_prompt = themeObj["Messenger_prompt"][activeScreen];
        const resTxt = themeObj["responsText"][activeScreen];
        const resTxtUser = themeObj["responsText-user"][activeScreen];
        const msgBox = themeObj["msg"][activeScreen];
        const msgUserBox = themeObj["msg-user"][activeScreen];
        const Messenger_content = themeObj["Messenger_content"][activeScreen];
        const mytext = themeObj["mytext"][activeScreen];
        const mytextbg = themeObj["mytext-bg"][activeScreen];
        const Messenger_header = themeObj["Messenger_header"][activeScreen];
        const timeTxt = themeObj["time"][activeScreen];
        const timeTxtUser = themeObj["time-user"][activeScreen];
        let conditional_messenger_content = "";
        if (Messenger_content["mainImage"]) {
            conditional_messenger_content = `background-image: url(${Messenger_content["mainImage"]});`;
        } else if (Messenger_content["mainVideo"]) {
            conditional_messenger_content = `background-image: url('');`;
        } else if (Messenger_content["mainAudio"]) {
            conditional_messenger_content = `background-image: url('');`;
        } else if (Messenger_content["bgColorChangeMeta"]) {
            conditional_messenger_content = `background-image: url('');
            background-color: ${Messenger_content["bgColorChangeMeta"]};`;
        }
        return `
        .avtr {
            padding-top: ${avtr["topPaddingMeta"]}px;
            padding-right: ${avtr["rightPaddingMeta"]}px;
            padding-bottom: ${avtr["bottomPaddingMeta"]}px;
            padding-left: ${avtr["leftPaddingMeta"]}px;
            margin-top: ${avtr["topMarginMeta"]}px;
            margin-right: ${avtr["rightMarginMeta"]}px;
            margin-bottom: ${avtr["bottomMarginMeta"]}px;
            margin-left: ${avtr["leftMarginMeta"]}px;
            height: ${avtr["heightValueMeta"]}px;
            width: ${avtr["widthValueMeta"]}px;
            display: inline-block;
        }
        .avtr figure {
            border-radius: ${avtr["topBorderRadiusMeta"]}px ${avtr["rightBorderRadiusMeta"]}px ${avtr["bottomBorderRadiusMeta"]}px ${avtr["leftBorderRadiusMeta"]}px;
            background-image: url(${avtr['logoImage']});
            background-color: #fee;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            display: block;
            margin: 0;
            padding-bottom: 100%;
        }
        .Messenger_prompt {
            padding-top: ${messenger_prompt["topPaddingMeta"]}px;
            padding-right: ${messenger_prompt["rightPaddingMeta"]}px;
            padding-bottom: ${messenger_prompt["bottomPaddingMeta"]}px;
            padding-left: ${messenger_prompt["leftPaddingMeta"]}px;
            margin-top: ${messenger_prompt["topMarginMeta"]}px;
            margin-right: ${messenger_prompt["rightMarginMeta"]}px;
            margin-bottom: ${messenger_prompt["bottomMarginMeta"]}px;
            margin-left: ${messenger_prompt["leftMarginMeta"]}px;
            font-size: ${messenger_prompt["fontSizeMeta"]}px;
            font-family: ${messenger_prompt["fontFamilyMeta"]};
            color: ${messenger_prompt["colorChangeMeta"]};
            font-weight: ${messenger_prompt["fontWeightMeta"]};
            line-height: 18px;
            text-overflow: ellipsis;
            display: flex;
            flex-direction: column;
        }
        .msg.bot {
            padding-top: ${msgBox["topPaddingMeta"]}px;
            padding-right: ${msgBox["rightPaddingMeta"]}px;
            padding-bottom: ${msgBox["bottomPaddingMeta"]}px;
            padding-left: ${msgBox["leftPaddingMeta"]}px;
            margin-top: ${msgBox["topMarginMeta"]}px;
            margin-right: ${msgBox["rightMarginMeta"]}px;
            margin-bottom: ${msgBox["bottomMarginMeta"]}px;
            margin-left: ${msgBox["leftMarginMeta"]}px;
            background-color: ${msgBox["bgColorChangeMeta"]};
            border-radius: ${msgBox["topBorderRadiusMeta"]}px ${msgBox["rightBorderRadiusMeta"]}px ${msgBox["bottomBorderRadiusMeta"]}px ${msgBox["leftBorderRadiusMeta"]}px;

            display: flex;
            align-items: center;
            position: relative;
            width: fit-content;
            max-width: 70%;
            min-width: 100px;
        }
        .msg.bot .responsText {
            padding-top: ${resTxt["topPaddingMeta"]}px;
            padding-right: ${resTxt["rightPaddingMeta"]}px;
            padding-bottom: ${resTxt["bottomPaddingMeta"]}px;
            padding-left: ${resTxt["leftPaddingMeta"]}px;
            margin-top: ${resTxt["topMarginMeta"]}px;
            margin-right: ${resTxt["rightMarginMeta"]}px;
            margin-bottom: ${resTxt["bottomMarginMeta"]}px;
            margin-left: ${resTxt["leftMarginMeta"]}px;
            font-size: ${resTxt["fontSizeMeta"]}px;
            font-family: ${resTxt["fontFamilyMeta"]};
            color: ${resTxt["colorChangeMeta"]};
            font-weight: ${resTxt["fontWeightMeta"]};

            display: inline-block;
            vertical-align: top;
        }
        .msg.bot .time {
            padding-top: ${timeTxt["topPaddingMeta"]}px;
            padding-right: ${timeTxt["rightPaddingMeta"]}px;
            padding-bottom: ${timeTxt["bottomPaddingMeta"]}px;
            padding-left: ${timeTxt["leftPaddingMeta"]}px;
            margin-top: ${timeTxt["topMarginMeta"]}px;
            margin-right: ${timeTxt["rightMarginMeta"]}px;
            margin-bottom: ${timeTxt["bottomMarginMeta"]}px;
            margin-left: ${timeTxt["leftMarginMeta"]}px;
            font-size: ${timeTxt["fontSizeMeta"]}px;
            font-family: ${timeTxt["fontFamilyMeta"]};
            color: ${timeTxt["colorChangeMeta"]};
            font-weight: ${timeTxt["fontWeightMeta"]};

            position: absolute;
            bottom: 4px;
            left: 15px;
        }
        .msg.user {
            padding-top: ${msgUserBox["topPaddingMeta"]}px;
            padding-right: ${msgUserBox["rightPaddingMeta"]}px;
            padding-bottom: ${msgUserBox["bottomPaddingMeta"]}px;
            padding-left: ${msgUserBox["leftPaddingMeta"]}px;
            margin-top: ${msgUserBox["topMarginMeta"]}px;
            margin-right: ${msgUserBox["rightMarginMeta"]}px;
            margin-bottom: ${msgUserBox["bottomMarginMeta"]}px;
            margin-left: ${msgUserBox["leftMarginMeta"] ? msgUserBox["leftMarginMeta"] + 'px' : 'auto'};
            background-color: ${msgUserBox["bgColorChangeMeta"]};
            border-radius: ${msgUserBox["topBorderRadiusMeta"]}px ${msgUserBox["rightBorderRadiusMeta"]}px ${msgUserBox["bottomBorderRadiusMeta"]}px ${msgUserBox["leftBorderRadiusMeta"]}px;

            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-direction: row-reverse;
            -webkit-flex-direction: row-reverse;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
            position: relative;
            width: fit-content;
            max-width: 70%;
            min-width: 100px;
        }
        .msg.user .responsText {
            padding-top: ${resTxtUser["topPaddingMeta"]}px;
            padding-right: ${resTxtUser["rightPaddingMeta"]}px;
            padding-bottom: ${resTxtUser["bottomPaddingMeta"]}px;
            padding-left: ${resTxtUser["leftPaddingMeta"]}px;
            margin-top: ${resTxtUser["topMarginMeta"]}px;
            margin-right: ${resTxtUser["rightMarginMeta"]}px;
            margin-bottom: ${resTxtUser["bottomMarginMeta"]}px;
            margin-left: ${resTxtUser["leftMarginMeta"]}px;
            font-size: ${resTxtUser["fontSizeMeta"]}px;
            font-family: ${resTxtUser["fontFamilyMeta"]};
            color: ${resTxtUser["colorChangeMeta"]};
            font-weight: ${resTxtUser["fontWeightMeta"]};

            display: inline-block;
            vertical-align: top;
        }
        .msg.user .time {
            padding-top: ${timeTxtUser["topPaddingMeta"]}px;
            padding-right: ${timeTxtUser["rightPaddingMeta"]}px;
            padding-bottom: ${timeTxtUser["bottomPaddingMeta"]}px;
            padding-left: ${timeTxtUser["leftPaddingMeta"]}px;
            margin-top: ${timeTxtUser["topMarginMeta"]}px;
            margin-right: ${timeTxtUser["rightMarginMeta"]}px;
            margin-bottom: ${timeTxtUser["bottomMarginMeta"]}px;
            margin-left: ${timeTxtUser["leftMarginMeta"]}px;
            font-size: ${timeTxtUser["fontSizeMeta"]}px;
            font-family: ${timeTxtUser["fontFamilyMeta"]};
            color: ${timeTxtUser["colorChangeMeta"]};
            font-weight: ${timeTxtUser["fontWeightMeta"]};

            position: absolute;
            bottom: 4px;
            left: 15px;
        }
        #mytext {
            padding-top: ${mytext["topPaddingMeta"]}px;
            padding-right: ${mytext["rightPaddingMeta"]}px;
            padding-bottom: ${mytext["bottomPaddingMeta"]}px;
            padding-left: ${mytext["leftPaddingMeta"]}px;
            margin-top: ${mytext["topMarginMeta"]}px;
            margin-right: ${mytext["rightMarginMeta"]}px;
            margin-bottom: ${mytext["bottomMarginMeta"]}px;
            margin-left: ${mytext["leftMarginMeta"]}px;
            font-size: ${mytext["fontSizeMeta"]}px;
            font-family: ${mytext["fontFamilyMeta"]};
            color: ${mytext["colorChangeMeta"]};
            font-weight: ${mytext["fontWeightMeta"]};
            max-height: 20px;
            background-color: transparent;
            border: none;
            outline: none;
            resize: none;
            width: 100%;
            max-width: calc(100% - 40px);
            line-height: 20px;
            min-height: 20px !important;
        }
        .Input-blank {
            padding-top: ${mytextbg["topPaddingMeta"]}px;
            padding-right: ${mytextbg["rightPaddingMeta"]}px;
            padding-bottom: ${mytextbg["bottomPaddingMeta"]}px;
            padding-left: ${mytextbg["leftPaddingMeta"]}px;
            margin-top: ${mytextbg["topMarginMeta"]}px;
            margin-right: ${mytextbg["rightMarginMeta"]}px;
            margin-bottom: ${mytextbg["bottomMarginMeta"]}px;
            margin-left: ${mytextbg["leftMarginMeta"]}px;
            background-color: ${mytextbg["bgColorChangeMeta"]};
            
            border-top: 1px solid #1d273157;
            color: #ffffff;
            -webkit-box-flex: 0;
            -webkit-flex-grow: 0;
            -ms-flex-positive: 0;
            flex-grow: 0;
            -webkit-flex-shrink: 0;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            position: relative;
            width: 100%;
        }
        .Messenger_header {
            background-color: ${Messenger_header["bgColorChangeMeta"]};
            color: rgb(255, 255, 255);
            display: -webkit-box; 
            display: -webkit-flex; 
            display: -ms-flexbox; 
            display: flex; 
            -webkit-box-align: center;
            -webkit-align-items: center; 
            -ms-flex-align: center; 
            align-items: center; 
            -webkit-flex-shrink: 0;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            height: 80px; 
            padding: 20px 10px; 
            gap: 10px;
            width: 100%;
        }
        .Messenger_content {
            padding-top: ${Messenger_content["topPaddingMeta"]}px;
            padding-right: ${Messenger_content["rightPaddingMeta"]}px;
            padding-bottom: ${Messenger_content["bottomPaddingMeta"]}px;
            padding-left: ${Messenger_content["leftPaddingMeta"]}px;
            margin-top: ${Messenger_content["topMarginMeta"]}px;
            margin-right: ${Messenger_content["rightMarginMeta"]}px;
            margin-bottom: ${Messenger_content["bottomMarginMeta"]}px;
            margin-left: ${Messenger_content["leftMarginMeta"]}px;
            border: none !important;
            background-color: #151f28;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            height: calc(100vh - 138px);
            position: relative;
            ${conditional_messenger_content}

            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            
        }
        .Messenger_messenger {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            position: relative;
            width: 100%;
            border-radius: 5px;
        }
        #video-play-button {
            position: absolute;
            right: 50px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            background: transparent;
        }
        .chat_close_icon {
            position: absolute;
            right: 12px;
            font-size: 16px;
            cursor: pointer;
            border: none;
            background: transparent;
            color: #fff;
        }
        .Messages {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-direction: column;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-flex-shrink: 1;
            -ms-flex-negative: 1;
            flex-shrink: 1;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0 10px 20px;
            position: relative;
        }
        #messenger {
            overflow: hidden;
            position: fixed;
            width: 100%;
            bottom: 0;
            left: 0;
            z-index: 10000;
            opacity: 1;
        }

        #msg-form-submit {
            background-color: transparent;
            border: none;
            bottom: 15px;
            cursor: pointer;
            height: 25px;
            outline: none;
            padding: 0;
            position: absolute;
            width: 25px;
        }
        `;
    }

}
