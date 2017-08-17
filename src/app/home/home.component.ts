import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'app/common/seo.service';

@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(private meta: Meta, title: Title, private adrService: SeoService) {

        title.setTitle('My Home Page');

        meta.addTags([
            { name: 'author', content: 'bms.com' },
            { name: 'description', content: 'this is my home description' },
        ]);
    }

    ngOnInit() {
        this.adrService.getKeywords()
            .subscribe(res => this.meta.addTag({ name: 'keywords', content: res }));
    }
}
