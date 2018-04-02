declare namespace VK {

    //#region Initialization
    /**
     * Функция, вызываемая при успешной инициализации API.
     */
    export type APISuccessInitCallback = () => void;
    /**
     * Функция, вызываемая при ошибке.
     */
    export type APIFailInitCallback = (error: any) => void;

    /**
     * После загрузки страницы для инициализации приложения необходимо вызвать функцию VK.init. Она принимает следующие параметры
     * @param onSuccess функция, вызываемая при успешной инициализации API.
     * @param onFail функция, вызываемая при ошибке.
     * @param veapiVersion версия API, используемая приложением
     * @example  VK.init(function() { 
            // API initialization succeeded 
            // Your code here 
        }, function() { 
            // API initialization failed 
            // Can reload page here 
        }, '5.74');
     * https://vk.com/dev/Javascript_SDK
     */
    export function init(onSuccess: APISuccessInitCallback, onFail: APIFailInitCallback, veapiVersion: '5.74');
    //#endregion

    //#region Client API

    /**
     * Методы Client API позволяют взаимодействовать с пользовательским интерфейсом из приложения 
     * вызывать диалоговые окна, менять размер окна приложения и т.д. 
     * Они доступны из IFrame и Flash приложений с помощью функции VK.callMethod из Javascript SDK и Flash SDK соответственно.
     */
    export type ClientAPIMethods = 'showInstallBox' | 'showSettingsBox' | 'showGroupSettingsBox' | 'showRequestBox' | 'showInviteBox' | 'showOrderBox' | 'showProfilePhotoBox' | 'resizeWindow' | 'scrollWindow' | 'setTitle' | 'setLocation' | 'scrollTop' | 'scrollSubscribe' | 'showInstallPushBox' | 'showAllowMessagesFromCommunityBox' | 'callUser' | 'checkUnitySupport' | 'checkFlashSupport' | 'showSubscriptionBox' | 'showAppWidgetPreviewBox';

    /**
     * Для вызова метода Client API в Javascript SDK используется функция VK.callMethod.
     * @param method название метода Client API.
     * @param args параметры метода Client API.
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: ClientAPIMethods, ...args: any[]);

    /**
     * Показывает окно с запросом разрешения на установку приложения. Если пользователь соглашается, вызывается событие onApplicationAdded.
     * Ограничения: не чаще одного вызова в 3 секунды.
     * @example VK.callMethod("showInstallBox");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showInstallBox');

    /**
     * Открывает окно с запросом прав доступа для приложения. Параметр settings — это битовая маска запрашиваемых прав доступа. Если settings = 0, то пользователю будет предложено разрешить все возможные права доступа. После изменения настроек вызывается событие onSettingsChanged. Если пользователь нажал «Отмена» или закрыл окно, генерируется событие onSettingsCancel.
     * Ограничения: не чаще одного вызова в 3 секунды.
     * @param method название метода Client API.
     * @param settings битовая маска запрашиваемых прав доступа.
     * @example VK.callMethod("showSettingsBox", 8214);
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showSettingsBox', settings: number);

    /**
     * Открывает окно с запросом прав доступа у сообщества для приложения. Параметр settings — это битовая маска запрашиваемых прав доступа. Если settings = 0, то сообществу будет предложено разрешить все возможные права доступа. После изменения настроек вызывается событие onGroupSettingsChanged. Если пользователь нажал «Отмена» или закрыл окно, генерируется событие onGroupSettingsCancel. 
     * Ограничения: не чаще одного вызова в 3 секунды. 
     * @param method название метода Client API.
     * @param settings битовая маска запрашиваемых прав доступа.
     * @example VK.callMethod("showGroupSettingsBox", 4096);
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showGroupSettingsBox', settings: number);

    /**
     * Открывает окно отправки запроса пользователю user_id (должен быть другом текущего пользователя) с текстом message и произвольным дополнительным параметром requestKey. С помощью этого метода пользователь может оповестить о событии в приложении своих друзей, даже если у них оно не установлено. При просмотре запроса получателем будут переданы параметры request_key и request_id.
     * После действия пользователя может быть вызвано одно из трёх событий: onRequestSuccess, onRequestCancel, onRequestFail. 
     * @param method название метода Client API.
     * @param user_id Id пользователя VK
     * @param message текст сообщения
     * @param requestKey произвольный дополнительный параметр
     * @example VK.callMethod("showRequestBox", 123456789, "Hello!", "myRequestKey");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showRequestBox', user_id: number, message: string, requestKey: string);

    /**
     * Открывает окно для приглашения друзей пользователя в приложение.
     * @param method название метода Client API.
     * @example VK.callMethod("showInviteBox");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showInviteBox');

    /**
     * Тип заказа. Возможные значения:
     * votes — окно для ввода голосов на счёт приложения;
     * offers — окно со списком специальных предложений (офферов), которые могут быть использованы пользователем для получения голосов;
     * item — покупка товара.
     * @link https://vk.com/dev/payments_dialog
     */
    export type ShowOrderBoxType = 'votes' | 'offers' | 'item';

    /**
     * Чтобы показать диалоговое окно платежа, используйте метод showOrderBox из Client API. Он принимает следующие параметры:
     * @link https://vk.com/dev/payments_dialog
     */
    export interface IShowOrderBoxParams {
        /**
         * тип заказа
         */
        type: ShowOrderBoxType;
        /**
         * количество голосов для ввода на счёт приложения (для type = votes).
         */
        votes: number;
        /**
         * идентификатор рекламной акции (для type = offers).
         */
        offer_id: number;
        /**
         * 1 — стоимость специальных предложений будет отображена в валюте приложения (для type = offers).
         */
        currency: number;
        /**
         * наименование товара, которое будет отправлено в уведомлении get_item (для type = item). Строка длиной до 64 символов. Например, item_25new. 
         */
        item: string;
    }
    /**
     * Открывает окно для покупки товара в приложении или ввода голоса на счёт приложения. См. полное описание метода: Диалоговое окно платежей.
     * После завершения оплаты в зависимости от результата в обработчик отправляется одно из трёх событий: onOrderCancel, onOrderSuccess, onOrderFail
     * @param method название метода Client API.
     * @param type Параметры конфигурации окна
     * @example var params = {
            type: 'item',
            item: 'item_25new'
        };
        VK.callMethod('showOrderBox', params);
        @link https://vk.com/dev/payments_dialog
     */
    export function callMethod(method: 'showOrderBox', type: any);

    /**
     * Открывает окно для подтверждения пользователем изменения фотографии на его странице. Параметр photo_hash может быть получен методом photos.saveOwnerPhoto. Если пользователь соглашается, вызывается событие onProfilePhotoSave. 
     * @param method название метода Client API.
     * @param photo_hash Параметр может быть получен методом photos.saveOwnerPhoto.
     * @example VK.callMethod("showProfilePhotoBox", "sdf87dfhsdfdfjererhfd9");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showProfilePhotoBox', photo_hash: string);

    /**
     * Инициирует изменение ширины и высоты элемента IFrame. Максимальное значение ширины окна — 1000 px, высоты — 4050. После изменения размера окна вызывается событие onWindowResized с новыми значениями ширины и высоты. 
     * @param method название метода Client API.
     * @param width ширина окна
     * @param height высота окна
     * @example VK.callMethod("resizeWindow", 500, 500);
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'resizeWindow', width: number, height: number);

    /**
     * Инициирует скроллинг окна браузера по вертикали. Параметр top задает смещение скролла относительно нулевой координаты окна. Например, для того чтобы прокрутить окно на самый верх страницы, необходимо передать значение 0. Второй параметр speed задает скорость анимации в миллисекундах и по умолчанию равен 0. 
     * @param method название метода Client API.
     * @param top смещение скролла относительно нулевой координаты окна.
     * @param speed скорость анимации в миллисекундах и по умолчанию равен 0.
     * @example VK.callMethod("scrollWindow", 200, 500);
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'scrollWindow', top: number, speed: number);

    /**
     * Изменяет заголовок вкладки браузера. 
     * @param method название метода Client API.
     * @param title заголовок
     * @example VK.callMethod("setTitle", "New title");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'setTitle', title: string);

    /**
     * Изменяет хеш текущего адреса страницы, который записывается в адресной строке браузера после символа #. Используется для поддержки кнопок "назад" и "вперед" в браузере. Параметр fireEvent определяет, нужно ли вызывать событие onLocationChanged сразу после запуска метода.
     * @param method название метода Client API.
     * @param location хеш адреса страницы
     * @param fireEvent определяет, нужно ли вызывать событие onLocationChanged сразу после запуска метода.
     * @example VK.callMethod("setLocation", "new_location");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'setLocation', location: string, fireEvent: boolean);

    /**
     * Вызывает событие onScrollTop c четырьмя элементами:
     * Текущее положение прокрутки окна ВКонтакте.
     * Высота окна ВКонтакте в браузере.
     * Отступ от начала страницы до объекта с приложением.
     * Активна ли текущая вкладка
     * @param method название метода Client API.
     * @example VK.callMethod("scrollTop");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'scrollTop');

    /**
     * Вызывает событие onScroll с текущим положением прокрутки и высотой окна, после прокрутки страницы пользователем. Параметр fireEvent определяет, нужно ли вызывать событие сразу после запуска метода. 
     * @param method название метода Client API.
     * @param fireEvent определяет, нужно ли вызывать событие сразу после запуска метода.
     * @example VK.callMethod("scrollSubscribe", true);
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'scrollSubscribe', fireEvent: boolean);

    /**
     * Вызывает окно для отправки ссылки на мобильную версию игры. После успешной отправки вызывается событие onInstallPushSuccess. 
     * @param method название метода Client API.
     * @example VK.callMethod("showInstallPushBox");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showInstallPushBox');

    /**
     * Вызывает окно для разрешения пользователем отправки ему сообщений от имени сообщества. После разрешения генерируется событие onAllowMessagesFromCommunity. Если пользователь нажал «Отмена» или закрыл окно, генерируется событие onAllowMessagesFromCommunityCancel. 
     * @param method название метода Client API.
     * @example VK.callMethod("showAllowMessagesFromCommunityBox");
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'showAllowMessagesFromCommunityBox');

    /**
     * Пользователь может вызвать в приложение любого из своих друзей, находящихся в сети на полной версии сайта с установленным flash актуальной версии. Получить список друзей, доступных для вызова, можно, используя метод friends.getAvailableForCall. 
     * После вызова метода пользователь увидит окно, где сможет отредактировать cообщение вызова и отправить запрос. 
     * После того как запрос будет отправлен, у получателя высветится окно с предложением перейти в приложение. 
     * Если пользователь отклонит вызов, будет вызвано событие onCallReject, содержащее в качестве единственного параметра идентификатор вызова.
     * Если пользователь примет вызов, будет вызвано событие onCallAccept, содержащее в качестве единственного параметра идентификатор вызова.
     * @param method название метода Client API.
     * @param user_id Идентификатор пользователя
     * @param request_id Идентификатор вызова должен состоять из символов a-zA-Z0-9_- 
     * @param request_message Сообщение вызова
     * @example VK.callMethod('callUser', 66748, 'call1234', 'Вызываю на дуэль'); 
     * @link https://vk.com/dev/api_calls
     */
    export function callMethod(method: 'callUser', user_id: number, request_id: string, request_message: string);

    /**
     * Проверяет возможность использования Unity в браузере пользователя и предлагает установить плеер Unity, если он отсутствует. В результате выполнения генерируются события:
     * onCheckUnitySupportSuccess — Unity установлен в браузере и может быть использован;
     * onCheckUnitySupportFail — Unity не установлен (показана заглушка с уведомлением о том, что игра требует Unity и ссылкой на установку).
     * @param method название метода Client API.
     * @example VK.callMethod('checkUnitySupport');
     * @link https://vk.com/dev/clientapi 
     */
    export function callMethod(method: 'checkUnitySupport');

    /**
     * Проверяет возможность использования Flash в браузере пользователя и предлагает установить Flash-плеер, если он отсутствует. В результате выполнения генерируются события:
     * onCheckFlashSupportSuccess — Flash установлен в браузере и может быть использован;
     * onCheckFlashSupportFail — Flash не установлен (показана заглушка с уведомлением о том, что игра требует Flash и ссылкой на установку).
     * @param method название метода Client API.
     * @example VK.callMethod('checkFlashSupport');
     * @link https://vk.com/dev/clientapi
     */
    export function callMethod(method: 'checkFlashSupport');


    /**
     * действие, которое необходимо совершить
     * create — приобрести подписку;
     * resume — возобновить подписку;
     * cancel — отменить подписку.
     * @link https://vk.com/dev/subscriptions_dialog
     */
    export type ShowSubscriptionBoxAction = 'create' | 'resume' | 'cancel';
    export interface IShowSubscriptionBoxParams {
        /**
         * наименование подписки, которое будет отправлено в уведомлении get_subscription. Строка длиной до 64 символов. Например: subscription_25new (для action = create).
         */
        item: string;
        /**
         * идентификатор подписки (для action = resume, cancel).
         */
        subscription_id: number;
    }
    /**
     * Открывает окно для покупки или отмены подписки в приложении. См. полное описание метода: Диалоговое окно подписки. 
     * Обратите внимание, при вызове этого метода вторым аргументом в сallMethod необходимо передать action — действие, которое нужно совершить. Возможные значения:
     * -- create — приобрести подписку;
     * -- resume — возобновить подписку;
     * -- cancel — отменить подписку.
     * После завершения оплаты в зависимости от результата в обработчик отправляется одно из трёх событий: onSubscriptionCancel, onSubscriptionSuccess, onSubscriptionFail
     * Обратите внимание — в тестовом режиме подписка 5 раз автоматически продлевается раз в 10 минут (для period = month) и раз в 2 минуты для других значений period. После этого подписка автоматически отменяется.
     * @param method название метода Client API.
     * @param action действие, которое необходимо совершить.
     * @param params Параметры конфигурации окна
     * @example VK.callMethod('showSubscriptionBox', 'create', {item: 'subscription1'});
     * @link https://vk.com/dev/subscriptions_dialog
     */
    export function callMethod(method: 'showSubscriptionBox', action: ShowSubscriptionBoxAction, params: IShowSubscriptionBoxParams);

    /**
     * тип виджета.
     * @link https://vk.com/dev/objects/appWidget
     * @link https://vk.com/dev/objects/appWidget_2
     * @link https://vk.com/dev/apps_widgets
     */
    export type ShowAppWidgetPreviewBox = 'text' | 'list' | 'table' | 'tiles' | 'compact_list' | 'cover_list' | 'match' | 'matches';
    /**
     * Виджет представляет собой блок данных, отрисованный в соответствии с формальным описанием, которое предоставляет приложение сообщества. 
     * Возвращает одно из следующих событий:
     * onAppWidgetPreviewFail — произошла ошибка (например, в code неверный синтаксис);
     * onAppWidgetPreviewCancel — установка виджета отменена пользователем;
     * onAppWidgetPreviewSuccess — установка виджета подтверждена.
     * Ограничения: не чаще 1 раза в 30 секунд 
     * @param method название метода Client API.
     * @param type тип виджета.
     * @param code код виджета.
     * @link https://vk.com/dev/apps_widgets
     * @link https://vk.com/dev/objects/appWidget
     * @link https://vk.com/dev/objects/appWidget_2
     * @example VK.callMethod('showAppWidgetPreviewBox', 'text', 'return { "title": "Цитата", "text": "Текст цитаты" };');
     */
    export function callMethod(method: 'showAppWidgetPreviewBox', type: ShowAppWidgetPreviewBox, code: string);

    //#endregion

    //#region Api methods

    export namespace Account {
        export type Method = string;
    }
    export namespace AppWidgets {
        export type Method = string;
    }
    export namespace Apps {
        export type Method = string;
    }
    export namespace Auth {
        export type Method = string;
    }
    export namespace Board {
        export type Method = string;
    }
    export namespace Database {
        export type Method = string;
    }
    export namespace Docs {
        export type Method = string;
    }
    export namespace Other {
        export type Method = string;
    }
    export namespace Fave {
        export type Method = string;
    }
    export namespace Friends {
        export type Method = string;
    }
    export namespace Gifts {
        export type Method = string;
    }
    export namespace Groups {
        export type Method = string;
    }
    export namespace Likes {
        export type Method = string;
    }
    export namespace Market {
        export type Method = string;
    }
    export namespace Messages {
        export type Method = string;
    }
    export namespace Newsfeed {
        export type Method = string;
    }
    export namespace Notes {
        export type Method = string;
    }
    export namespace Notifications {
        export type Method = string;
    }
    export namespace Pages {
        export type Method = string;
    }
    export namespace Photos {
        export type Method = string;
    }
    export namespace Places {
        export type Method = string;
    }
    export namespace Polls {
        export type Method = string;
    }
    export namespace Search {
        export type Method = string;
    }
    export namespace Stats {
        export type Method = string;
    }
    export namespace Status {
        export type Method = string;
    }
    export namespace Storage {
        export type Method = string;
    }
    export namespace Stories {
        export type Method = string;
    }
    export namespace Streaming {
        export type Method = string;
    }
    export namespace Users {
        export type Method = string;
    }
    export namespace Utils {
        export type Method = string;
    }
    export namespace Video {
        export type Method = string;
    }
    export namespace Wall {
        export type Method = string;
    }
    export namespace Widgets {
        export type Method = 'widgets.getComments' | 'widgets.getPages';


        export type GetCommentsOrder = 'date' | 'likes' | 'last_comment';
        /**
         * Параметры для метода widgets.getComments
         */
        export interface GetCommentsParams {
            /**
             * Идентификатор приложения/сайта, с которым инициализируются виджеты.
             */
            widget_api_id: number;
            /**
             * URL-адрес страницы.
             */
            url: string;
            /**
             * внутренний идентификатор страницы в приложении/сайте (в случае, если для инициализации виджетов использовался параметр page_id).
             */
            page_id: string;
            /**
             * тип сортировки комментариев. Возможные значения: date, likes, last_comment. Значение по умолчанию - date. 
             */
            order: string;
            /**
             * перечисленные через запятую поля анкет необходимые для получения. Если среди полей присутствует replies, будут возвращены последние комментарии второго уровня для каждого комментария первого уровня. 
             */
            fields: string;
            /**
             * смещение необходимое для выборки определенного подмножества комментариев. По умолчанию 0. 
             */
            offset: number;
            /**
             * количество возвращаемых записей. 
             */
            count: number;

        }

        export interface GetCommentsResponse {
            count: number;
            posts: 
        }

    }

    export namespace Objects {
        /**
         * тип записи.
         */
        export type PostType = 'post' | 'copy' | 'reply' | 'postpone' | 'suggest';
        export interface Post {
            id: number;
            owner_id: number;
            from_id: number;
            created_by: number;
            date: number;
            text: string;
            reply_owner_id: number;
            reply_post_id: number;
            friends_only: number;
            comments: {
                count: number;
                can_post: number;
                groups_can_post: number;
            };
            likes: {
                count: number;
                user_likes: number;
                can_like: number;
                can_publish: number;
            };
            reposts: {
                count: number;
                user_reposted: number;
            };
            views: {
                count: number;
            };
            post_type: PostType;
            attachments: any[]; //TODO: Attachment[] добвить тип
            geo: {
                type: string;
                coordinates: string;
                place: {
                    id: number;
                    title: string;
                    latitude: number;
                    longitude: number;
                    created: number;
                    icon: string;
                    country: string;
                    city: string;
                    type: string;
                    group_id: number;
                    group_photo: string;
                    checkins: number;
                    updated: number;
                    address: number;
                };
            };
            signer_id: number;
            copy_history: any; // TODO: Узнать что за тип и поменять;
            can_pin: number;
            can_delete: number;
            can_edit: number;
            is_pinned: number;
            marked_as_ads: number;
        }
    }

    export type ApiMethod = VK.Account.Method | VK.Apps.Method | VK.AppWidgets.Method | VK.Auth.Method | VK.Board.Method | VK.Database.Method | VK.Docs.Method | VK.Fave.Method | VK.Friends.Method | VK.Gifts.Method | VK.Groups.Method | VK.Likes.Method | VK.Market.Method | VK.Messages.Method | VK.Newsfeed.Method | VK.Notes.Method | VK.Notifications.Method | VK.Other.Method | VK.Pages.Method | VK.Photos.Method | VK.Places.Method | VK.Polls.Method | VK.Search.Method | VK.Stats.Method | VK.Status.Method | VK.Storage.Method | VK.Stories.Method | VK.Streaming.Method | VK.Users.Method | VK.Utils.Method | VK.Video.Method | VK.Wall.Method | VK.Widgets.Method;

    /**
     * Методы API ВКонтакте позволяют работать с данными пользователей и сообществ ВКонтакте. Для обращения к методам API в JavaScript SDK используется функция VK.api.
     * @param methodName название метода API;
     * @param params объект, содержащий параметры метода;
     * @param callback функция, в которую будет передан полученный результат после выполнения метода.
     * @example VK.api("wall.post", {"message": "Hello!", "v":"5.73"}, function (data) {
        alert("Post ID:" + data.response.post_id);
        });
     * @link https://vk.com/dev/Javascript_SDK
     */
    export function api(methodName: ApiMethod, params: any, callback: (data: any) => void);

    //#endregion
}