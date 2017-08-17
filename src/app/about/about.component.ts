import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'app/common/seo.service';

@Component({
    templateUrl: 'about.component.html'
})

export class AboutComponent implements OnInit {
    constructor(private meta: Meta, title: Title, private adrService: SeoService) {

        title.setTitle('My About Page');

        meta.addTags([
            { name: 'author', content: 'bms.com' },
            { name: 'description', content: 'this is my home description' }
        ]);

    }

    ngOnInit() {
        this.adrService.getKeywords()
            .subscribe(res => this.meta.addTag({ name: 'keywords', content: res }));
    }
}
