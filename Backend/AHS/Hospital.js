class Hospital {
    constructor(Name,Category,WaitTime,URL,Note,TimesUnavailable){
        this.Name = Name;
        this.Category = Category;
        this.WaitTime = WaitTime;
        this.URL = URL;
        this.Note = Note;
        this.TimesUnavailable = TimesUnavailable;
    }
}

module.exports = Hospital