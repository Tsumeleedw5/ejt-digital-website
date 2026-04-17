import React from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight } from "lucide-react";

// Assuming assets exist
import logoHorizontalWhite from "@assets/06_horizontal_lockup_black_1776422934785.png";
import logoIconWhite from "@assets/02_icon_black_1776422934783.png";

// Generated images
import heroBg from "@/assets/hero-bg.png";
import serviceWebsites from "@/assets/service-websites.png";
import serviceSocial from "@/assets/service-social.png";
import serviceBrand from "@/assets/service-brand.png";
import serviceAds from "@/assets/service-ads.png";
import processBg from "@/assets/process-bg.png";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  service: z.enum(["websites", "social-media", "brand-strategy", "ads", "other"], {
    required_error: "Please select a service",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-foreground selection:text-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden" id="hero">
          <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-background/60 z-10" />
            <img 
              src={heroBg} 
              alt="Architecture" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          
          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary leading-[1.1] mb-6">
                Etched into <br />
                <span className="text-muted-foreground italic">reality.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 font-light tracking-wide leading-relaxed">
                We build precision-engineered growth systems for small businesses. 
                Serious scale for serious brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none h-14 px-8 text-sm uppercase tracking-widest font-medium" asChild>
                  <a href="#contact">Work With Us</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-none h-14 px-8 text-sm uppercase tracking-widest font-medium bg-transparent text-primary hover:bg-white/5 border-border" asChild>
                  <a href="#services">Our Systems</a>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-6 md:left-10 text-xs tracking-[0.3em] uppercase text-muted-foreground origin-left transform -rotate-90 flex items-center gap-4"
          >
            <span>Scroll</span>
            <div className="w-12 h-[1px] bg-border" />
          </motion.div>
        </section>

        {/* Introduction */}
        <section className="py-32 bg-background relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-serif mb-8">
                  Most agencies build noise.<br />
                  <span className="text-muted-foreground italic">We build assets.</span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-muted-foreground text-lg font-light leading-relaxed space-y-6"
              >
                <p>
                  EJT Digital is a brand scaling agency that transforms small businesses into market leaders. We don't just run ads or post content. We engineer comprehensive digital systems designed to capture attention and convert it into revenue.
                </p>
                <p>
                  Your brand is your most valuable asset. We treat it with the gravity it deserves.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-32 bg-[#0a0a0a]" id="services">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
            >
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">What We Do</h3>
                <h2 className="text-4xl md:text-5xl font-serif">Core Systems</h2>
              </div>
              <p className="text-muted-foreground max-w-md font-light">
                Four interconnected pillars that form the foundation of a dominant brand presence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <ServiceCard 
                num="01"
                title="Websites That Work For You"
                desc="High-performance, beautifully engineered digital storefronts optimized for conversion."
                img={serviceWebsites}
                delay={0}
              />
              <ServiceCard 
                num="02"
                title="Social Media That Builds Authority"
                desc="Strategic content that positions your brand as the definitive leader in your space."
                img={serviceSocial}
                delay={0.2}
              />
              <ServiceCard 
                num="03"
                title="Brand Strategy & Identity"
                desc="Comprehensive brand architectures that command premium positioning and trust."
                img={serviceBrand}
                delay={0}
              />
              <ServiceCard 
                num="04"
                title="Ads & Client Acquisition"
                desc="Data-driven acquisition systems that predictably turn strangers into loyal clients."
                img={serviceAds}
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* Process / Why Us */}
        <section className="relative py-32 overflow-hidden" id="process">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-background/80 z-10" />
            <img src={processBg} alt="Process" className="w-full h-full object-cover grayscale opacity-30" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-6xl font-serif mb-8">The EJT Method</h2>
                <p className="text-xl text-muted-foreground font-light mb-16">
                  We don't guess. We execute based on proven frameworks that scale predictable revenue.
                </p>
              </motion.div>
              
              <div className="space-y-12 text-left">
                {[
                  { title: "Discovery & Diagnosis", desc: "We map your current ecosystem, identify the bottlenecks holding you back, and uncover hidden leverage points." },
                  { title: "System Architecture", desc: "We design a custom infrastructure covering brand, web, content, and acquisition tailored to your specific goals." },
                  { title: "Precision Execution", desc: "Our team builds and deploys the system with uncompromising attention to detail and quality." },
                  { title: "Optimization & Scale", desc: "We ruthlessly track data, optimize for higher conversion rates, and pour fuel on what works." }
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-6 md:gap-12"
                  >
                    <div className="font-serif text-2xl md:text-3xl text-muted-foreground w-12 shrink-0">
                      {(i + 1).toString().padStart(2, '0')}.
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-medium mb-3">{step.title}</h4>
                      <p className="text-muted-foreground font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-32 bg-card" id="contact">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-6xl font-serif mb-8">Initiate<br/>Contact.</h2>
                <p className="text-muted-foreground font-light text-lg mb-12">
                  Ready to scale your brand? Fill out the form, and our partners will be in touch within 24 hours to schedule a discovery session.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Email</h4>
                    <p className="text-lg">ejtdigital19@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Phone</h4>
                    <p className="text-lg">067 007 0229</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Location</h4>
                    <p className="text-lg">Global</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="flex items-center">
          <img src={logoHorizontalWhite} alt="EJT Digital" className="h-8 md:h-10 object-contain invert" />
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#process" className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">Process</a>
        </nav>
        
        <Button className="rounded-none uppercase tracking-widest text-xs h-10 px-6" asChild>
          <a href="#contact">Start</a>
        </Button>
      </div>
    </header>
  );
}

function ServiceCard({ num, title, desc, img, delay }: { num: string, title: string, desc: string, img: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden mb-6 aspect-[4/3] bg-muted relative">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>
      <div className="flex gap-4">
        <span className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{num}</span>
        <div>
          <h4 className="text-2xl font-serif mb-3 group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-muted-foreground font-light leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Request Received.",
          description: "Our team will contact you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Submission failed.",
          description: "There was an error processing your request. Please try again.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-background p-8 md:p-10 border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Email *</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 890" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corp" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Service Required *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus:ring-0 focus:border-primary">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none border-border bg-popover">
                  <SelectItem value="websites" className="focus:bg-white/5 cursor-pointer">Websites</SelectItem>
                  <SelectItem value="social-media" className="focus:bg-white/5 cursor-pointer">Social Media</SelectItem>
                  <SelectItem value="brand-strategy" className="focus:bg-white/5 cursor-pointer">Brand Strategy</SelectItem>
                  <SelectItem value="ads" className="focus:bg-white/5 cursor-pointer">Ads</SelectItem>
                  <SelectItem value="other" className="focus:bg-white/5 cursor-pointer">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">Project Details *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your brand and goals..." 
                  className="resize-none rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full rounded-none h-14 uppercase tracking-widest text-sm mt-8"
          disabled={submitContact.isPending}
        >
          {submitContact.isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting</>
          ) : (
            <>Submit Request <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </form>
    </Form>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050505] py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <img src={logoIconWhite} alt="EJT Digital" className="h-12 invert mb-8" />
            <p className="text-muted-foreground font-light max-w-sm">
              Etched into reality. We build precision-engineered growth systems for small businesses.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/80">
              <li><a href="#hero" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-light text-foreground/80">
              <li><a href="mailto:ejtdigital19@gmail.com" className="hover:text-primary transition-colors">ejtdigital19@gmail.com</a></li>
              <li><a href="tel:0670070229" className="hover:text-primary transition-colors">067 007 0229</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EJT Digital. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-primary transition-colors">TERMS</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
