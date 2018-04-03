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
            posts: VK.Objects.Post[];
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

    export namespace Objects {

        /**
         * тип текущего рода занятия пользователя
         */
        export type UserOccupationType = 'work' | 'school' | 'university';

        /**
         * тип родственной связи
         */
        export type UserRealtivesType = 'child' | 'sibling' | 'parent' | 'grandparent' | 'grandchild';

        /**
         * Объект содержит информацию о пользователе ВКонтакте. Набор полей может меняться в зависимости от вызванного метода и переданных в нем параметров. 
         * Обратите внимание — все поля, которые используют информацию о текущем пользователе (например, blacklisted_by_me) требуют передачи ключа доступа пользователя в запросе, даже если сам метод можно вызывать без ключа доступа.
         */
        export interface User {
            /**
             * идентификатор пользователя.
             */
            id: number;
            /**
             * имя.
             */
            first_name: string;
            /**
             * фамилия.
             */
            last_name: string;
            /**
             * поле возвращается, если страница пользователя удалена или заблокирована, содержит значение deleted или banned. В этом случае опциональные поля не возвращаются.
             */
            deactivated: string;
            /**
             * возвращается 1 при вызове без access_token, если пользователь установил настройку «Кому в интернете видна моя страница» — «Только пользователям ВКонтакте». В этом случае опциональные поля не возвращаются.
             */
            hidden: number;

            /**
             * содержимое поля «О себе» из профиля.
             */
            about: string;

            /**
             * содержимое поля «Деятельность» из профиля.
             */
            activities: string;

            /**
             * дата рождения. Возвращается в формате D.M.YYYY или D.M (если год рождения скрыт). Если дата рождения скрыта целиком, поле отсутствует в ответе.
             */
            bdate: string;

            /**
             * информация о том, находится ли текущий пользователь в черном списке. Возможные значения:
             * 1 — находится;
             * 0 — не находится.
             */
            blacklisted: number;

            /**
             * информация о том, находится ли пользователь в черном списке у текущего пользователя. Возможные значения:
             * 1 — находится;
             * 0 — не находится.
             */
            blacklisted_by_me: number;

            /**
             * содержимое поля «Любимые книги» из профиля пользователя.
             */
            books: string;

            /**
             * информация о том, может ли текущий пользователь оставлять записи на стене. Возможные значения:
             * 1 — может;
             * 0 — не может.
             */
            can_post: number;

            /**
             * информация о том, может ли текущий пользователь видеть аудиозаписи. Возможные значения:
             * 1 — может;
             * 0 — не может.
             */
            can_see_all_posts: number;

            /**
             * информация о том, будет ли отправлено уведомление пользователю о заявке в друзья от текущего пользователя. Возможные значения:
             * 1 — уведомление будет отправлено;
             * 0 — уведомление не будет отправлено.
             */
            can_send_friend_request: number;

            /**
             * информация о том, может ли текущий пользователь отправить личное сообщение. Возможные значения:
             * 1 — может;
             * 0 — не может.
             */
            can_write_private_message: number;

            /**
             * информация о карьере пользователя.
             */
            career: {
                /**
                 * идентификатор сообщества (если доступно, иначе company);
                 */
                group_id: number;
                /**
                 * название компании (если доступно, иначе group_id);
                 */
                company: string;
                /**
                 * идентификатор страны;
                 */
                country_id: number;
                /**
                 *  идентификатор города (если доступно, иначе city_name);
                 */
                city_id: number;
                /**
                 * название города (если доступно, иначе city_id);
                 */
                city_name: string;
                /**
                 * год начала работы;
                 */
                from: number;
                /**
                 * год окончания работы;
                 */
                until: number;
                /**
                 * должность.
                 */
                position: string;
            };
            /**
             * информация о городе, указанном на странице пользователя в разделе «Контакты».
             */
            city: {
                /**
                 * идентификатор города, который можно использовать для получения его названия с помощью метода database.getCitiesById;
                 */
                id: number;
                /**
                 * название города.
                 */
                title: string;
            };
            /**
             * количество общих друзей с текущим пользователем.
             */
            common_count: number;

            /**
             * возвращает данные об указанных в профиле сервисах пользователя, таких как: skype, facebook, twitter, livejournal, instagram. Для каждого сервиса возвращается отдельное поле с типом string, содержащее никнейм пользователя. Например, "instagram": "username".
             */
            connections: {
                [key: string]: string; //TODO: add avaliable connections
            }

            /**
             * информация о телефонных номерах пользователя. Если данные указаны и не скрыты настройками приватности
             */
            contacts: {
                /**
                 * номер мобильного телефона пользователя (только для Standalone-приложений);
                 */
                mobile_phone: string;
                /**
                 * дополнительный номер телефона пользователя.
                 */
                home_phone: string;
            };

            /**
             * количество различных объектов у пользователя. Поле возвращается только в методе users.get при запросе информации об одном пользователе, с передачей access_token. 
             */
            counters: {
                /**
                 *  количество фотоальбомов;
                 */
                albums: number;
                /**
                 * количество видеозаписей;
                 */
                videos: number;
                /**
                 * количество аудиозаписей;
                 */
                audios: number;
                /**
                 * количество фотографий;
                 */
                photos: number;
                /**
                 * количество заметок;
                 */
                notes: number;
                /**
                 * количество друзей;
                 */
                friends: number;
                /**
                 * количество сообществ;
                 */
                groups: number;
                /**
                 * количество друзей онлайн;
                 */
                online_friends: number;
                /**
                 * количество общих друзей;
                 */
                mutual_friends: number;
                /**
                 * количество видеозаписей с пользователем;
                 */
                user_videos: number;
                /**
                 * количество подписчиков;
                 */
                followers: number;
                /**
                 * количество объектов в блоке «Интересные страницы».
                 */
                pages: number;
            };

            /**
             * информация о стране, указанной на странице пользователя в разделе «Контакты»
             */
            country: {
                /**
                 * идентификатор страны, который можно использовать для получения ее названия с помощью метода database.getCountriesById;
                 */
                id: number;
                /**
                 * название страны.
                 */
                title: string;
            };
            /**
             * возвращает данные о точках, по которым вырезаны профильная и миниатюрная фотографии пользователя.
             */
            crop_photo: {
                /**
                 * бъект photo фотографии пользователя, из которой вырезается главное фото профиля.
                 */
                photo: any; //TODO: change to Photo
                /**
                 * вырезанная фотография пользователя.
                 */
                crop: Rectangle;
                /**
                 * миниатюрная квадратная фотография, вырезанная из фотографии crop.
                 */
                rect: Rectangle;
            };
            /**
             * короткий адрес страницы. Возвращается строка, содержащая короткий адрес страницы 
             * @example andrew
             * Если он не назначен, возвращается "id"+user_id
             * @example id35828305
             */
            domain: string;

            /**
             * информация о высшем учебном заведении пользователя.
             */
            education: {
                /**
                 * идентификатор университета;
                 */
                university: number;
                /**
                 * название университета;
                 */
                university_name: string;
                /**
                 * идентификатор факультета;
                 */
                faculty: number;
                /**
                 * название факультета;
                 */
                faculty_name: string;
                /**
                 * год окончания.
                 */
                graduation: number;
            };
            /**
             * внешние сервисы, в которые настроен экспорт из ВК (twitter, facebook, livejournal, instagram).
             */
            exports: any; //TODO: findout type

            /**
             * имя в именительном падеже
             */
            first_name_nom: string;
            /**
             * имя в родительном падеже
             */
            first_name_gen: string;
            /**
             * имя в дательном падеже
             */
            first_name_dat: string;
            /**
             * имя в винительном падеже
             */
            first_name_acc: string;
            /**
             * имя в творительном падеже
             */
            first_name_ins: string;
            /**
             * имя в предложном падеже
             */
            first_name_abl: string;

            /**
             * количество подписчиков пользователя.
             */
            followers_count: number;

            /**
             * статус дружбы с пользователем. Возможные значения:
             * 0 — не является другом,
             * 1 — отправлена заявка/подписка пользователю,
             * 2 — имеется входящая заявка/подписка от пользователя,
             * 3 — является другом.
             */
            friend_status: number;

            /**
             * содержимое поля «Любимые игры» из профиля.
             */
            games: string;

            /**
             * информация о том, известен ли номер мобильного телефона пользователя. Возвращаемые значения:
             * 1 — известен, 
             * 0 — не известен.
             */
            has_mobile: number;

            /**
             * 1, если пользователь установил фотографию для профиля.
             */
            has_photo: number;
            /**
             * название родного города.
             */
            home_town: string;
            /**
             * содержимое поля «Интересы» из профиля.
             */
            interests: string;
            /**
             * информация о том, есть ли пользователь в закладках у текущего пользователя. Возможные значения:
             * 1 — есть;
             * 0 — нет.
             */
            is_favorite: number;
            /**
             * информация о том, является ли пользователь другом текущего пользователя. Возможные значения:
             * 1 — да;
             * 0 — нет.
             */
            is_friend: number;
            /**
             * информация о том, скрыт ли пользователь из ленты новостей текущего пользователя. Возможные значения:
             * 1 — да;
             * 0 — нет.
             */
            is_hidden_from_feed: number;

            /**
             * фамилия в именительном падеже
             */
            last_name_nom: string;
            /**
             * фамилия в родительном падеже
             */
            last_name_gen: string;
            /**
             * фамилия в дательном падеже
             */
            last_name_dat: string;
            /**
             * фамилия в винительном падеже
             */
            last_name_acc: string;
            /**
             * фамилия в творительном падеже
             */
            last_name_ins: string;
            /**
             * фамилия в предложном падеже
             */
            last_name_abl: string;

            /**
             * время последнего посещения
             */
            last_seen: {
                /**
                 * время последнего посещения в формате Unixtime.
                 */
                time: number;
                /**
                 *  тип платформы. Возможные значения:
                 * 1 — мобильная версия;
                 * 2 — приложение для iPhone;
                 * 3 — приложение для iPad;
                 * 4 — приложение для Android;
                 * 5 — приложение для Windows Phone;
                 * 6 — приложение для Windows 10;
                 * 7 — полная версия сайта;
                 * 8 — VK Mobile.
                 */
                platform: number;
            }

            /**
             * разделенные запятой идентификаторы списков друзей, в которых состоит пользователь. Поле доступно только для метода friends.get.
             */
            lists: string;

            /**
             * девичья фамилия.
             */
            maiden_name: string;

            /**
             * информация о военной службе пользователя
             */
            military: {
                /**
                 * номер части;
                 */
                unit: string;
                /**
                 * идентификатор части в базе данных;
                 */
                unit_id: number;
                /**
                 * идентификатор страны, в которой находится часть;
                 */
                country_id: number;
                /**
                 * год начала службы;
                 */
                from: number;
                /**
                 * год окончания службы.
                 */
                until: number;
            };
            /**
             * содержимое поля «Любимые фильмы» из профиля пользователя.
             */
            movies: string;
            /**
             * содержимое поля «Любимая музыка» из профиля пользователя.
             */
            music: string;
            /**
             * никнейм (отчество) пользователя. 
             */
            nickname: string;

            /**
             * информация о текущем роде занятия пользователя
             */
            occupation: {
                /**
                 * тип. Возможные значения:
                 * work — работа;
                 * school — среднее образование;
                 * university — высшее образование.
                 */
                type: UserOccupationType;
                /**
                 * идентификатор школы, вуза, сообщества компании (в которой пользователь работает);
                 */
                id: number;
                /**
                 * название школы, вуза или места работы;
                 */
                name: string;
            };

            /**
             * информация о том, находится ли пользователь сейчас на сайте. Если пользователь использует мобильное приложение либо мобильную версию, возвращается дополнительное поле online_mobile, содержащее 1. При этом, если используется именно приложение, дополнительно возвращается поле online_app, содержащее его идентификатор.
             */
            online: number;
            /**
             * Если пользователь использует мобильное приложение либо мобильную версию, возвращается дополнительное поле online_mobile, содержащее 1.
             */
            online_mobile: number;
            /**
             * если используется именно приложение, дополнительно возвращается поле online_app, содержащее его идентификатор.
             */
            online_app: number;

            /**
             * информация о полях из раздела «Жизненная позиция».
             */
            personal: {
                /**
                 *  политические предпочтения. Возможные значения: 1 — коммунистические; 2 — социалистические; 3 — умеренные; 4 — либеральные; 5 — консервативные; 6 — монархические;  7 — ультраконсервативные; 8 — индифферентные; 9 — либертарианские.
                 */
                political: number;
                /**
                 * языки
                 */
                langs: string[]; // TODO check type
                /**
                 * мировоззрение
                 */
                religion: string;
                /**
                 * источники вдохновения.
                 */
                inspired_by: string;
                /**
                 *  главное в людях. Возможные значения: 1 — ум и креативность; 2 — доброта и честность; 3 — красота и здоровье; 4 — власть и богатство; 5 — смелость и упорство; 6 — юмор и жизнелюбие. 
                 */
                people_main: number;
                /**
                 *  главное в жизни. Возможные значения: 1 — семья и дети; 2 — карьера и деньги; 3 — развлечения и отдых; 4 — наука и исследования; 5 — совершенствование мира; 6 — саморазвитие; 7 — красота и искусство;  8 — слава и влияние;
                 */
                life_main: number;

                /**
                 * отношение к курению. Возможные значения: 1 — резко негативное; 2 — негативное; 3 — компромиссное; 4 — нейтральное;5 — положительное.
                 */
                smoking: number;

                /**
                 * отношение к алкоголю. Возможные значения: 1 — резко негативное; 2 — негативное; 3 — компромиссное; 4 — нейтральное; 5 — положительное.
                 */
                alcohol: number;
            };
            /**
             * url квадратной фотографии пользователя, имеющей ширину 50 пикселей. В случае отсутствия у пользователя фотографии возвращается https://vk.com/images/camera_50.png.
             */
            photo_50: string;
            /**
             * url квадратной фотографии пользователя, имеющей ширину 100 пикселей. В случае отсутствия у пользователя фотографии возвращается https://vk.com/images/camera_100.png.
             */
            photo_100: string;
            /**
             * url фотографии пользователя, имеющей ширину 200 пикселей. В случае отсутствия у пользователя фотографии возвращается https://vk.com/images/camera_200.png.
             */
            photo_200_orig: string;
            /**
             * url квадратной фотографии, имеющей ширину 200 пикселей. Если у пользователя отсутствует фотография таких размеров, в ответе вернется https://vk.com/images/camera_200.png
             */
            photo_200: string;
            /**
             * url фотографии, имеющей ширину 400 пикселей. Если у пользователя отсутствует фотография такого размера, в ответе вернется https://vk.com/images/camera_400.png.
             */
            photo_400_orig: string;
            /**
             * строковый идентификатор главной фотографии профиля пользователя в формате {user_id}_{photo_id}, например, 6492_192164258. Обратите внимание, это поле может отсутствовать в ответе.
             */
            photo_id: string;

            /**
             * url квадратной фотографии с максимальной шириной. Может быть возвращена фотография, имеющая ширину как 200, так и 100 пикселей. В случае отсутствия у пользователя фотографии возвращается https://vk.com/images/camera_200.png.
             */
            photo_max: string;

            /**
             * url фотографии максимального размера. Может быть возвращена фотография, имеющая ширину как 400, так и 200 пикселей. В случае отсутствия у пользователя фотографии возвращается https://vk.com/images/camera_400.png.
             */
            photo_max_orig: string;
            /**
             * любимые цитаты.
             */
            quotes: string;

            /**
             * список родственников
             */
            relatives: Array<{
                /**
                 * идентификатор пользователя;
                 */
                id: number;
                /**
                 * имя родственника (в том случае, если родственник не является пользователем ВКонтакте, в этом случае id не возвращается);
                 */
                name: string;
                /**
                 * тип родственной связи. Возможные значения: child — сын/дочь; sibling — брат/сестра; parent — отец/мать; grandparent — дедушка/бабушка; grandchild — внук/внучка. 
                 */
                type: UserRealtivesType;
            }>;

            /**семейное положение. Возможные значения: 1 — не женат/не замужем; 2 — есть друг/есть подруга; 3 — помолвлен/помолвлена; 4 — женат/замужем; 5 — всё сложно; 6 — в активном поиске; 7 — влюблён/влюблена; 8 — в гражданском браке; 0 — не указано. Если в семейном положении указан другой пользователь, дополнительно возвращается объект relation_partner, содержащий id и имя этого человека. */
            relation: number;
            /**
             * Если в семейном положении указан другой пользователь, дополнительно возвращается объект relation_partner, содержащий id и имя этого человека.
             */
            relation_partner: number;

            /**
             * список школ, в которых учился пользователь
             */
            schools: School[];

            /**
             * короткое имя страницы.
             */
            screen_name: string;
            /**
             * пол. Возможные значения: 1 — женский; 2 — мужской; 0 — пол не указан.
             */
            sex: number;

            /**
             * адрес сайта, указанный в профиле.
             */
            site: string;

            /**
             * статус пользователя. Возвращается строка, содержащая текст статуса, расположенного в профиле под именем. Если включена опция «Транслировать в статус играющую музыку», возвращается дополнительное поле status_audio, содержащее информацию о композиции.
             */
            status: string;

            /**
             *  информация о композиции
             */
            status_audio: any; // TODO: findout type
            /**
             * временная зона. Только при запросе информации о текущем пользователе.
             */
            timezone: number;

            /**
             * информация о том, есть ли на странице пользователя «огонёк».
             */
            trending: number;

            /**
             * любимые телешоу.
             */
            tv: string;

            /**
             * список вузов, в которых учился пользователь
             */
            universities: Univercity[];

            /**
             * возвращается 1, если страница пользователя верифицирована, 0 — если нет.
             */
            verified: number;

            /**
             * режим стены по умолчанию. Возможные значения: owner, all.
             */
            wall_default: UserWallType;
        }

        /**
         * режим стены по умолчанию
         */
        export type UserWallType = 'owner' | 'all';

        /**
         * объект описывающий школу
         */
        export interface School {
            /**
             * идентификатор школы;
             */
            id: number;
            /**
             * идентификатор страны, в которой расположена школа;
             */
            country: number;
            /**
             * идентификатор города, в котором расположена школа;
             */
            city: number;
            /**
             * наименование школы
             */
            name: string;
            /**
             * год начала обучения;
             */
            year_from: number;
            /**
             * год окончания обучения;
             */
            year_to: number;
            /**
             *  год выпуска;
             */
            year_graduated: number;
            /**
             * буква класса;
             */
            class: string;
            /**
             * специализация;
             */
            speciality: string;
            /**
             * идентификатор типа;
             */
            type: number;
            /**
             * название типа. Возможные значения для пар type-typeStr: 0 — "школа"; 1 — "гимназия";  2 —"лицей"; 3 — "школа-интернат"; 4 — "школа вечерняя"; 5 — "школа музыкальная"; 6 — "школа спортивная"; 7 — "школа художественная"; 8 — "колледж"; 9 — "профессиональный лицей"; 10 — "техникум"; 11 — "ПТУ"; 12 — "училище"; 13 — "школа искусств".
             */
            type_str: string;
        }

        /**
         * объект описывающий университет
         */
        export interface Univercity {
            /**
             * идентификатор университета;
             */
            id: number;
            /**
             * идентификатор страны, в которой расположен университет;
             */
            country: number
            /**
             * идентификатор города, в котором расположен университет;
             */
            city: number;
            /**
             * наименование университета;
             */
            name: string;
            /**
             * идентификатор факультета; 
            */
            faculty: number;
            /**
             * наименование факультета;
             */
            faculty_name: string;
            /**
             * идентификатор кафедры;
             */
            chair: number;
            /**
             * наименование кафедры;
             */
            chair_name: string;
            /**
             * год окончания обучения;
             */
            graduation: number;
            /**
             * форма обучения;
             */
            education_form: string;
            /**
             * 
             */
            education_status: string;
        }

        /**
         * тип записи.
         */
        export type PostType = 'post' | 'copy' | 'reply' | 'postpone' | 'suggest';
        /**
         * Объект, описывающий запись на стене пользователя или сообщества
         */
        export interface Post {
            /**
             * идентификатор записи.
             */
            id: number;
            /**
             * идентификатор владельца стены, на которой размещена запись. В версиях API ниже 5.7 это поле называется to_id.
             */
            owner_id: number;
            /**
             * идентификатор автора записи (от чьего имени опубликована запись).
             */
            from_id: number;
            /**
             * идентификатор администратора, который опубликовал запись (возвращается только для сообществ при запросе с ключом доступа администратора).
             */
            created_by: number;
            /**
             * время публикации записи в формате unixtime.
             */
            date: number;
            /**
             * текст записи.
             */
            text: string;
            /**
             * идентификатор владельца записи, в ответ на которую была оставлена текущая.
             */
            reply_owner_id: number;
            /**
             * идентификатор записи, в ответ на которую была оставлена текущая.
             */
            reply_post_id: number;
            /**
             * 1, если запись была создана с опцией «Только для друзей».
             */
            friends_only: number;
            /**
             * информация о комментариях к записи
             */
            comments: PostCommentInfo;
            /**
             * информация о лайках к записи
             */
            likes: PostLikesInfo;
            /**
             * информация о репостах записи («Рассказать друзьям»)
             */
            reposts: PostRepostsInfo;
            /**
             * информация о просмотрах записи
             */
            views: PostViewsInfo;
            /**
             * тип записи, может принимать следующие значения: post, copy, reply, postpone, suggest.
             */
            post_type: PostType;
            /**
             * информация о способе размещения записи
             */
            post_source: PostSource;
            /**
             * медиавложения записи (фотографии, ссылки и т.п.).
             */
            attachments: Attachment[];
            /**
             * информация о местоположении
             */
            geo: GeoObject;
            /**
             * идентификатор автора, если запись была опубликована от имени сообщества и подписана пользователем;
             */
            signer_id: number;
            /**
             * массив, содержащий историю репостов для записи. Возвращается только в том случае, если запись является репостом. Каждый из объектов массива, в свою очередь, является объектом-записью стандартного формата.
             */
            copy_history: any; // TODO: Узнать что за тип и поменять;
            /**
             * информация о том, может ли текущий пользователь закрепить запись (1 — может, 0 — не может).
             */
            can_pin: number;
            /**
             * информация о том, может ли текущий пользователь удалить запись (1 — может, 0 — не может).
             */
            can_delete: number;
            /**
             * информация о том, может ли текущий пользователь редактировать запись (1 — может, 0 — не может).
             */
            can_edit: number;
            /**
             * информация о том, что запись закреплена.
             */
            is_pinned: number;
            /**
             * информация о том, содержит ли запись отметку "реклама" (1 — да, 0 — нет).
             */
            marked_as_ads: number;
        }

        /**
         * тип вложения
         */
        export type PostAttachmentType = 'photo' | 'posted_photo' | 'video' | 'audio' | 'doc' | 'graffiti' | 'link' | 'note' | 'app' | 'poll' | 'page' | 'album' | 'photos_list' | 'market' | 'market_album' | 'sticker';
        /**
         * Первое поле — type (string) содержит тип вложения (photo,note,audio и т.д.). Название второго поля совпадает со значением, переданным в type. Второе поле содержит объект, представляющий медиавложение. Структура объекта в этом поле зависит от его типа. 
         */
        export interface Attachment {
            /**
             * тип вложения
             */
            type: PostAttachmentType;
            /** 
             * При получении объектов, прямого доступа к которым может не быть, например, фотографий или видео в новостях, вместе с объектами приходит поле access_key, которое необходимо передавать при получении этих объектов напрямую или при совершении с ними действий. 
             * Например, поле access_key принимают методы video.get, photos.getById. access_key нужно добавить к строковому id объекта через символ подчеркивания
             */
            access_key: string;
            //TODO: add attachment types

        }

        /**
         * Объект post_source, описывающий способ размещения записи на стене, содержит следующие поля: 
         */
        export interface PostSource {
            /**
             * тип источника. Возможные значения: vk — запись создана через основной интерфейс сайта (http://vk.com/); widget — запись создана через виджет на стороннем сайте; api — запись создана приложением через API; rss— запись создана посредством импорта RSS-ленты со стороннего сайта; sms — запись создана посредством отправки SMS-сообщения на специальный номер. 
             */
            type: PostSourceType;
            /**
             * название платформы, если оно доступно
             */
            platform: PostSourcePlatformType;
            /**
             * тип действия (только для type = vk или widget). Возможные значения: profile_activity — изменение статуса под именем пользователя (для type = vk); profile_photo — изменение профильной фотографии пользователя (для type = vk); comments — виджет комментариев (для type = widget); like — виджет «Мне нравится» (для type = widget); poll — виджет опросов (для type = widget); 
             */
            data: string;
            /**
             * URL ресурса, с которого была опубликована запись.
             */
            url: string;
        }

        /**
         * тип действия (только для type = vk или widget)
         */
        export type PostSourceDataType = 'profile_activity' | 'profile_photo' | 'comments' | 'like' | 'poll';

        /**
         * название платформы, если оно доступно
         */
        export type PostSourcePlatformType = 'android' | 'iphone' | 'wphone';

        /**
         * тип источника
         */
        export type PostSourceType = 'vk' | 'widget' | 'api ' | 'rss' | 'sms';

        /**
         * информация о просмотрах записи
         */
        export interface PostViewsInfo {
            /**
             * число просмотров записи.
             */
            count: number;
        }

        /**
         * информация о репостах записи («Рассказать друзьям»)
         */
        export interface PostRepostsInfo {
            /**
             * число пользователей, скопировавших запись;
             */
            count: number;
            /**
             * наличие репоста от текущего пользователя (1 — есть, 0 — нет).
             */
            user_reposted: number;
        }

        /**
         * информация о лайках к записи
         */
        export interface PostLikesInfo {
            /**
             *  число пользователей, которым понравилась запись;
             */
            count: number;
            /**
             * наличие отметки «Мне нравится» от текущего пользователя (1 — есть, 0 — нет);
             */
            user_likes: number;
            /**
             * информация о том, может ли текущий пользователь поставить отметку «Мне нравится» (1 — может, 0 — не может);
             */
            can_like: number;
            /**
             * информация о том, может ли текущий пользователь сделать репост записи (1 — может, 0 — не может).
             */
            can_publish: number;
        }

        /**
         * информация о комментариях к записи
         */
        export interface PostCommentInfo {
            /**
             * количество комментариев;
             */
            count: number;
            /**
             * информация о том, может ли текущий пользователь комментировать запись (1 — может, 0 — не может);
             */
            can_post: number;
            /**
             * информация о том, могут ли сообщества комментировать запись.
             */
            groups_can_post: number;
        }

        /**
         * информация о местоположении
         */
        export interface GeoObject {
            /**
             *  тип места
             */
            type: string;
            /**
             * координаты места
             */
            coordinates: string;
            /**
             * описание места (если оно добавлено)
             */
            place: {
                /**
                 * идентификатор места (если назначено)
                 */
                id: number;
                /**
                 * название места (если назначено);
                 */
                title: string;
                /**
                 *  географическая широта;
                 */
                latitude: number;
                /**
                 *  географическая долгота;
                 */
                longitude: number;
                /**
                 * дата создания (если назначено);
                 */
                created: number;
                /**
                 * URL изображения-иконки;
                 */
                icon: string;
                /**
                 * название страны
                 */
                country: string;
                /**
                 *  название города;
                 */
                city: string;
                /**
                 * тип чекина
                 */
                type: string;
                /**
                 * идентификатор сообщества;
                 */
                group_id: number;
                /**
                 *  URL миниатюры главной фотографии сообщества;
                 */
                group_photo: string;
                /**
                 * количество чекинов;
                 */
                checkins: number;
                /**
                 * время последнего чекина в Unixtime;
                 */
                updated: number;
                /**
                 * адрес
                 */
                address: number;
            };
        }


        /**
         * Объект содержит информацию о сообществе ВКонтакте. Набор полей может меняться в зависимости от вызванного метода и переданных в нем параметров.
         */
        export interface Group {
            /**
             * идентификатор сообщества.
             */
            id: number;
            /**
             * название сообщества.
             */
            name: string;
            /**
             * короткий адрес
             * @example apiclub.
             */
            screen_name: string;
            /**
             * является ли сообщество закрытым. Возможные значения: 0 — открытое; 1 — закрытое; 2 — частное.
             */
            is_closed: number;
            /**
             * возвращается в случае, если сообщество удалено или заблокировано. Возможные значения: deleted — сообщество удалено; banned — сообщество заблокировано; 
             */
            deactivated: GroupDeactivtedType;

            /**
             * информация о том, является ли текущий пользователь руководителем. Возможные значения: 1 — является; 0 — не является.
             * 
             * Требуется scope = groups
             */
            is_admin: number;

            /**
             * уровень полномочий текущего пользователя (если is_admin = 1): 1 — модератор; 2 — редактор; 3 — администратор.
             * 
             * Требуется scope = groups
             */
            admin_level: number;

            /**
             * информация о том, является ли текущий пользователь участником. Возможные значения: 1 — является; 0 — не является.
             * 
             * Требуется scope = groups
             */
            is_member: number;

            /**
             * идентификатор пользователя, который отправил приглашение в сообщество. Поле возвращается только для метода groups.getInvites.
             * 
             * Требуется scope = groups
             */
            invited_by: number;

            /**
             * возвращается в случае, если сообщество удалено или заблокировано. Возможные значения: deleted — сообщество удалено; banned — сообщество заблокировано; 
             */
            type: GroupType;

            /**
             * URL главной фотографии с размером 50x50px.
             */
            photo_50: string;
            /**
             * URL главной фотографии с размером 100х100px.
             */
            photo_100: string;
            /**
             * URL главной фотографии в максимальном размере.
             */
            photo_200: string;

            /**
             * строка состояния публичной страницы. У групп возвращается строковое значение, открыта ли группа или нет, а у событий дата начала.
             */
            activity?: string;

            /**
             * возрастное ограничение. 1 — нет; 2 — 16+; 3 — 18+.
             */
            age_limits?: number;

            /**
             * информация о занесении в черный список сообщества (поле возвращается только при запросе информации об одном сообществе)
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            ban_info?: {
                /**
                 * срок окончания блокировки в формате unixtime;
                 */
                end_date: number;
                /**
                 * комментарий к блокировке.
                 */
                comment: string;
            };

            /**
             * информация о том, может ли текущий пользователь написать сообщение сообществу. Возможные значения: 1 — может; 0 — не может.
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            can_create_topic?: number;

            /**
             * информация о том, может ли текущий пользователь оставлять записи на стене сообщества. Возможные значения: 1 — может; 0 — не может. 
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            can_post?: number;

            /**
             * информация о том, разрешено ли видеть чужие записи на стене группы. Возможные значения: 1 — может; 0 — не может. 
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            can_see_all_posts?: number;

            /**
             * информация о том, может ли текущий пользователь загружать документы в группу. Возможные значения: 1 — может; 0 — не может.
             * 
             * Поле возвращается только при передаче access_token в запросе.
             */
            can_upload_doc?: number;

            /**
             * информация о том, может ли текущий пользователь загружать видеозаписи в группу. Возможные значения: 1 — может; 0 — не может. 
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            can_upload_video?: number;

            /**
             * город, указанный в информации о сообществе
             */
            city?: {
                /**
                 * идентификатор города;
                 */
                id: number;
                /**
                 * название города.
                 */
                title: string;
            };

            /**
             * информация из блока контактов публичной страницы
             */
            contacts?: GroupContact[];

            /**
             * объект, содержащий счётчики сообщества
             */
            counters?: {
                photos: number;
                albums: number;
                audios: number;
                videos: number;
                topics: number;
                docs: number;
            };

            /**
             * страна, указанная в информации о сообществе.
             */
            country?: {
                /**
                 * идентификатор страны;
                 */
                id: number;
                /**
                 * название страны.
                 */
                title: string;
            };

            /**
             * обложка сообщества
             */
            cover?: {
                /**
                 * информация о том, включена ли обложка (1 — да, 0 — нет);
                 */
                enabled: number;
                /**
                 * копии изображений обложки
                 */
                images: GroupImage[];
            };

            /**
             * возвращает данные о точках, по которым вырезаны профильная и миниатюрная фотографии сообщества.
             */
            crop_photo?: {
                /**
                 * объект photo фотографии пользователя, из которой вырезается главное фото сообщества.
                 */
                photo: any; //TODO: change to Photo
                /**
                 * вырезанная фотография сообщества
                 */
                crop: Rectangle;
                /**
                 * миниатюрная квадратная фотография, вырезанная из фотографии crop
                 */
                rect: Rectangle;
            };

            /**
             * текст описания сообщества.
             */
            description?: string;

            /**
             * идентификатор закрепленной записи. Получить дополнительные данные о записи можно методом wall.getById, передав в поле posts {group_id}_{post_id}.
             */
            fixed_post?: number;

            /**
             * информация о том, установлена ли у сообщества главная фотография. Возможные значения: 1 — установлена; 0 — не установлена.
             */
            has_photo?: number;

            /**
             * информация о том, находится ли сообщество в закладках у текущего пользователя. Возможные значения:  1 — находится ; 0 — не находится. 
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            is_favorite?: number;

            /**
             * информация о том, скрыто ли сообщество из ленты новостей текущего пользователя. Возможные значения: 1 — скрыто ; 0 — не скрыто. 
             * 
             * Поле возвращается только при передаче access_token в запросе
             */
            is_hidden_from_feed?: number;

            /**
             * информация о том, заблокированы ли сообщения от этого сообщества (для текущего пользователя).
             */
            is_messages_blocked?: number;

            /**
             * информация из блока ссылок сообщества
             * 
             * Поле возвращается только при запросе данных об одном сообществе
             */
            links?: GroupLink[];

            /**
             * идентификатор основного фотоальбома.
             */
            main_album_id?: number;

            /**
             * информация о главной секции. Возможные значения: 0 — отсутствует; 1 — фотографии;  2 — обсуждения; 3 — аудиозаписи; 4 — видеозаписи; 5 — товары.
             */
            main_section?: number;

            /**
             * информация о магазине
             */
            market?: GroupMarket;

            /**
             * статус участника текущего пользователя. Возможные значения: 0 — не является участником; 1 — является участником; 2 — не уверен, что посетит мероприятие; 3 — отклонил приглашение; 4 — запрос на вступление отправлен;  5 — приглашен.
             * 
             * Требуется scope = groups
             */
            member_status?: number;

            /**
             * место, указанное в информации о сообществе
             */
            place?: GroupPlace;

            /**
             * возвращается для публичных страниц. Текст описания для поля start_date.
             */
            public_date_label?: string;

            /**
             * адрес сайта из поля «веб-сайт» в описании сообщества.
             */
            site?: string;

            /**
             * для встреч содержит время начала встречи в формате unixtime. Для публичных страниц start_date — дата основания в формате YYYYMMDD.
             */
            start_date?: number | string;

            /**
             * для встреч окончание встречи в формате unixtime
             */
            finish_date?: number;

            /**
             * статус сообщества.
             */
            status?: string;

            /**
             * информация о том, есть ли у сообщества «огонёк».
             */
            trending?: number;
            /**
             * информация о том, верифицировано ли сообщество. Возможные значения: 1 — является; 0 — не является.
             */
            verified?: number;
            /**
             * название главной вики-страницы.
             */
            wiki_page?: string;

        }

        /**
         * место, указанное в информации о сообществе
         */
        export interface GroupPlace {
            /**
             * идентификатор места;
             */
            id: number;
            /**
             * название места;
             */
            title: string;
            /**
             * географическая широта в градусах (от -90 до 90);
             */
            latitude: number;
            /**
             * географическая долгота в градусах (от -180 до 180);
             */
            longitude: number;
            /**
             * тип места;
             */
            type: string;
            /**
             * идентификатор страны;
             */
            country: number;
            /**
             * идентификатор города;
             */
            city: number;
            /**
             * адрес
             */
            address: string;
        }

        /**
         * информация о магазине
         */
        export interface GroupMarket {
            /**
             * информация о том, включен ли блок товаров в сообществе. Возможные значения:  1 — включен; 0 — выключен. 
             * 
             * Если enabled = 0, объект не содержит других полей.
             */
            enabled: number;
            /**
             * минимальная цена товаров;
             */
            price_min: number;
            /**
             * максимальная цена товаров;
             */
            price_max: number;
            /**
             * идентификатор главной подборки товаров;
             */
            main_album_id: number;
            /**
             * идентификатор контактного лица для связи с продавцом. Возвращается отрицательное значение, если для связи с продавцом используются сообщения сообщества;
             */
            contact_id: number;
            /**
             * нформация о валюте. Объект, содержащий поля:
             */
            currency: GroupCurrency;
            /**
             * строковое обозначение.
    
             */
            currency_text: string;
        }

        /**
         * информация о валюте
         */
        export interface GroupCurrency {
            /**
             * идентификатор валюты;
             */
            id: number;
            /**
             * символьное обозначение;
             */
            name: string;
        }

        /**
         * ссылка сообщества.
         */
        export interface GroupLink {
            /**
             * идентификатор ссылки;
             */
            id: number;
            /**
             * URL;
             */
            url: string;
            /**
             * название ссылки;
             */
            name: string;
            /**
             * описание ссылки;
             */
            desc: string;
            /**
             * URL изображения-превью шириной 50px;
             */
            photo_50: string;
            /**
             * URL изображения-превью шириной 100px
             */
            photo_100: string;

        }

        /**
         * копия изображений обложки
         */
        export interface GroupImage {
            /**
             * URL копии;
             */
            url: string;
            /**
             * ширина копии;
             */
            width: string;
            /**
             * высота копии.
             */
            height: string;
        }

        /**
         * информация из блока контактов публичной страницы.
         */
        export interface GroupContact {
            /**
             * идентификатор пользователя;
             */
            user_id: number;
            /**
             * должность;
             */
            desc: string;
            /**
             * номер телефона;
             */
            phone: string;
            /**
             * адрес e-mail.
             */
            email: string;
        }

        /**
         * возвращается в случае, если сообщество удалено или заблокировано. 
         */
        export type GroupDeactivtedType = 'deleted' | 'banned';

        /**
         * тип сообщества
         */
        export type GroupType = 'group' | 'page' | 'event';


        /**
         * Координаты вырезанного объекта
         */
        export interface Rectangle {
            /**
             * координата X левого верхнего угла в процентах;
             */
            x: number;
            /**
             * координата Y левого верхнего угла в процентах;
             */
            y: number;
            /**
             * координата X правого нижнего угла в процентах;
             */
            x2: number;
            /**
             * координата Y правого нижнего угла в процентах.
             */
            y2: number;
        }

        /**
         * Объект, описывающий комментарий к записи
         */
        export interface Comment {
            /**
             * идентификатор комментария.
             */
            id: number;
            /**
             * идентификатор автора комментария.
             */
            from_id: number;
            /**
             * дата создания комментария в формате Unixtime.
             */
            date: number;
            /**
             * текст комментария.
             */
            text: string;
            /**
             * идентификатор пользователя или сообщества, в ответ которому оставлен текущий комментарий (если применимо).
             */
            reply_to_user: string;
            /**
             * идентификатор комментария, в ответ на который оставлен текущий (если применимо).
             */
            reply_to_comment: string;
            /**
             * медиавложения комментария (фотографии, ссылки и т.п.)
             */
            attachments: Attachment[];
        }

        /**
         * Объект, описывающий личное сообщение
         */
        export interface Message {
            /**
             * идентификатор сообщения (не возвращается для пересланных сообщений).
             */
            id: number;
            /**
             * идентификатор пользователя, в диалоге с которым находится сообщение.
             */
            user_id: number;
            /**
             * идентификатор автора сообщения. положительное число
             */
            from_id: number;
            /**
             * дата отправки сообщения в формате Unixtime.
             */
            date: number;
            /**
             * статус сообщения (0 — не прочитано, 1 — прочитано, не возвращается для пересланных сообщений).
             */
            read_state: number;
            /**
             * тип сообщения (0 — полученное, 1 — отправленное, не возвращается для пересланных сообщений).
             */
            out: number;
            /**
             * заголовок сообщения или беседы.
             */
            title: string;
            /**
             * текст сообщения.
             */
            body: string;
            /**
             * информация о местоположении
             */
            geo: GeoObject;
            /**
             * медиавложения сообщения (фотографии, ссылки и т.п.)
             */
            attachments: Attachment[];
            /**
             * массив пересланных сообщений (если есть). Максимальное количество элементов — 100. Максимальная глубина вложенности для пересланных сообщений — 45, общее максимальное количество в цепочке с учетом вложенности — 500.
             */
            fwd_messages: Message[];
            /**
             * содержатся ли в сообщении emoji-смайлы.
             */
            emoji: number;
            /**
             * является ли сообщение важным.
             */
            important: number;
            /**
             * удалено ли сообщение.
             */
            deleted: number;
            /**
             * идентификатор, используемый при отправке сообщения. Возвращается только для исходящих сообщений.
             */
            random_id: number;

            /**
             * идентификатор беседы.
             */
            chat_id: number;
            /**
             * идентификаторы авторов последних сообщений беседы (integer).
             */
            chat_active: number[];
            /**
             * настройки уведомлений для беседы, если они есть.
             */
            push_settings: PushSettings;
            /**
             * количество участников беседы.
             */
            users_count: number;
            /**
             * идентификатор создателя беседы.
             */
            admin_id: number;
            /**
             * тип действия (если это служебное сообщение). Возможные значения: chat_photo_update — обновлена фотография беседы; chat_photo_remove — удалена фотография беседы; chat_create — создана беседа; chat_title_update — обновлено название беседы; chat_invite_user — приглашен пользователь; chat_kick_user — исключен пользователь. chat_pin_message — закреплено сообщение; chat_unpin_message — откреплено сообщение; chat_invite_user_by_link — пользователь присоединился к беседе по ссылке. 
             */
            action: MessageAction;
            /**
             * идентификатор пользователя (если > 0) или email (если < 0), которого пригласили или исключили (для служебных сообщений с action = chat_invite_user, chat_invite_user_by_link или chat_kick_user). Идентификатор пользователя, который закрепил/открепил сообщение для action = chat_pin_message или chat_unpin_message.
             */
            action_mid: number;
            /**
             * email, который пригласили или исключили (для служебных сообщений с action = chat_invite_user или chat_kick_user и отрицательным action_mid).
             */
            action_email: string;
            /**
             * название беседы (для служебных сообщений с action = chat_create или chat_title_update). Текст закрепленного сообщения для action = chat_pin_message.
             */
            action_text: string;
            /**
             * URL копии фотографии беседы шириной 50 px.
             */
            photo_50: string;
            /**
             * URL копии фотографии беседы шириной 100 px.
             */
            photo_100: string;
            /**
             * URL копии фотографии беседы шириной 200 px.
             */
            photo_200: string;
        }

        /**
         * тип действия (если это служебное сообщение)
         */
        export type MessageAction = 'chat_photo_update' | 'chat_photo_remove' | 'chat_create' | 'chat_title_update' | 'chat_invite_user' | 'chat_kick_user' | 'chat_pin_message' | 'chat_unpin_message' | 'chat_invite_user_by_link';

        /**
         * Объект, описывающий чат
         */
        export interface Chat {
            /**
             * идентификатор беседы.
             */
            id: number;
            /**
             * тип диалога.
             */
            type: string;
            /**
             * название беседы.
             */
            title: string;
            /**
             * идентификатор пользователя, который является создателем беседы.
             */
            admin_id: number;
            /**
             * список идентификаторов (integer) участников беседы.
             */
            users: number[];
            /**
             * настройки оповещений для диалога
             */
            push_settings: PushSettings;
            /**
             * URL изображения-обложки чата шириной 50 px (если доступно).
             */
            photo_50: string;
            /**
             * URL изображения-обложки чата шириной 200 px (если доступно).
             */
            photo_100: string;
            /**
             * URL изображения-обложки чата шириной 200 px (если доступно).
             */
            photo_200: string;
            /**
             * флаг, указывающий, что пользователь покинул беседу. Всегда содержит 1.
             */
            left: number;
            /**
             * флаг, указывающий, что пользователь был исключен из беседы. Всегда содержит 1.
             */
            kicked: number;
        }

        /**
         * настройки оповещений для диалога
         */
        export interface PushSettings {
            /**
             * указывает, включен ли звук оповещений (1 — включен, 0 — отключен);
             */
            sound: number;
            /**
             * указывает, до какого времени оповещения для чата отключены. -1 — отключены навсегда (бессрочно).
             */
            disabled_until: number;
        }

        /**
         * Объект, описывающий заметку
         */
        export interface Note {
            /**
             * идентификатор заметки.
             */
            id: number;
            /**
             * идентификатор владельца заметки.
             */
            owner_id: number;
            /**
             * заголовок заметки.
             */
            title: string;
            /**
             * текст заметки.
             */
            text: string;
            /**
             * дата создания заметки в формате Unixtime.
             */
            date: number;
            /**
             * количество комментариев.
             */
            comments: number;
            /**
             * количество прочитанных комментариев (только при запросе информации о заметке текущего пользователя).
             */
            read_comments: number;
            /**
             * URL страницы для отображения заметки.
             */
            view_url: string;
        }

        /**
         * Объект, описывающий вики-страницу
         */
        export interface Page {
            /**
             * идентификатор вики-страницы.
             */
            id: number;
            /**
             * идентификатор сообщества.
             */
            group_id: number;
            /**
             * идентификатор создателя вики-страницы.
             */
            creator_id: number;
            /**
             * название вики-страницы.
             */
            title: string;
            /**
             * 1, если текущий пользователь может редактировать текст вики-страницы, иначе — 0.
             */
            current_user_can_edit: number;
            /**
             * 1, если текущий пользователь может изменять права доступа на вики-страницу, иначе — 0.
             */
            current_user_can_edit_access: number;
            /**
             * информация о том, кто может просматривать вики-страницу: 2 — просматривать страницу могут все; 1 — только участники сообщества; 0 — только руководители сообщества.
             */
            who_can_view: number;
            /**
             * указывает, кто может редактировать вики-страницу: 2 — редактировать страницу могут все; 1 — только участники сообщества; 0 — только руководители сообщества.
             */
            who_can_edit: number;
            /**
             * дата последнего изменения вики-страницы в формате Unixtime.
             */
            edited: number;
            /**
             * дата создания вики-страницы в формате Unixtime.
             */
            created: number;
            /**
             * идентификатор пользователя, который редактировал вики-страницу последним.
             */
            editor_id: number;
            /**
             * количество просмотров вики-страницы.
             */
            views: number;
            /**
             * заголовок родительской страницы для навигации, если есть.
             */
            parent: string;
            /**
             * заголовок второй родительской страницы для навигации, если есть
             */
            parent2: string;
            /**
             * текст страницы в вики-формате, если был запрошен.
             */
            source: string;
            /**
             * текст страницы в html-формате, если был запрошен.
             */
            html: string;
            /**
             * адрес страницы для отображения вики-страницы.
             */
            view_url: string;
        }
    }

}